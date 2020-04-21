const User = require("../models/User");
const fs = require("fs");
const moment = require("moment");
const readline = require("readline");
const { google } = require("googleapis");
const path = require("path");

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const eventSCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(__dirname, "/token.json");

const secretPath = path.join(__dirname, "/client_secret_test.json");

const authorizeCalendar = async (req, res) => {
  // Load client secrets from a local file.
  fs.readFile(secretPath, { encoding: "utf-8" }, async (err, content) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error with loading client secret file:" + err,
      });
    }
    // Authorize a client with credentials
    let credentials = JSON.parse(content);

    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    // Check if we have previously stored a token.
    fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err, token) => {
      if (err) {
        const authUrl = oAuth2Client.generateAuthUrl({
          access_type: "offline",
          scope: eventSCOPES,
        });
        return res.json({ success: false, message: authUrl });
      }
      return res.json({ success: true, message: "Token already set" });
    });
  });
};

const createCalendarToken = (req, res) => {
  // Load client secrets from a local file.
  fs.readFile(secretPath, { encoding: "utf-8" }, async (err, content) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error with loading client secret file:" + err,
      });
    }
    // Authorize a client with credentials
    let credentials = JSON.parse(content);

    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    oAuth2Client.getToken(req.body.code, (err, token) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error retrieving access token" + err,
        });
      }
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error writing access token" + err,
          });
        }
        return res.json({
          success: true,
          message: "Token stored successfully",
        });
      });
    });
  });
};

const addCalendarEvent = async (req, res) => {
  // Load client secrets from a local file.

  fs.readFile(secretPath, { encoding: "utf-8" }, async (err, content) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error with loading client secret file:" + err,
      });
    }
    // Authorize a client with credentials
    let credentials = JSON.parse(content);

    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err, token) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error with setting token: " + err,
        });
      }

      oAuth2Client.setCredentials(JSON.parse(token));

      const calendar = google.calendar({ version: "v3", oAuth2Client });

      let dateFormat = moment(req.body.date).format();
      let startTimeFormat = moment(req.body.startTime).format();
      let endTimeFormat = moment(req.body.endTime).format();

      let dateParts = dateFormat.slice(0).split("T");
      let startParts = startTimeFormat.slice(0).split("T");
      let endParts = endTimeFormat.slice(0).split("T");

      let dateComponent = dateParts[0];
      let startTimeComponent = startParts[1];
      let endTimeComponent = endParts[1];

      let start = dateComponent + "T" + startTimeComponent;
      let end = dateComponent + "T" + endTimeComponent;

      var event = {
        summary: req.body.title,
        start: {
          dateTime: start,
        },
        end: {
          dateTime: end,
        },
      };

      calendar.events.insert(
        {
          auth: oAuth2Client,
          calendarId: req.body.userCalendarID,
          resource: event,
        },
        function (err, event) {
          if (err) {
            return res.json({
              success: false,
              message: "Error with creating event: " + err,
            });
          }
          console.log("Event created: %s", event.data.htmlLink);
          return res.json({
            success: true,
            message: "Event created successfully",
          });
        }
      );
    });
  });
};

const getCalendarID = async (req, res) => {
  let userEmail = req.body.selectedUser;
  let calendar = true;
  //console.log("1");
  console.log("user email: " + req.body.selectedUser);

  await User.findOne({ email: userEmail })
    .then((user) => {
      if (user.calendarID === "") {
        calendar = false;
      } else {
        return res.json({
          success: true,
          message: user.calendarID,
        });
      }
    })
    .catch((error) => {
      return res.json({ success: false, message: error });
    });

  if (!calendar) {
    console.log("2");
    // Load client secrets from a local file.
    fs.readFile(secretPath, { encoding: "utf-8" }, async (err, content) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error with loading client secret file:" + err,
        });
      }
      // Authorize a client with credentials
      let credentials = JSON.parse(content);

      const { client_secret, client_id, redirect_uris } = credentials.installed;
      const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
      );

      fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err, token) => {
        if (err) {
          return res.json({
            success: false,
            message: "Error with setting token: " + err,
          });
        }
        console.log("3");
        oAuth2Client.setCredentials(JSON.parse(token));

        const calendar = google.calendar({ version: "v3", oAuth2Client });

        calendar.calendars.insert(
          {
            auth: oAuth2Client,
            resource: { summary: userEmail },
          },
          function (err, calendar) {
            console.log("4");
            if (err) {
              return res.json({
                success: false,
                message: "Error with creating calendar: " + err,
              });
            }
            console.log("5");
            console.log("Calendar id:" + calendar.data.id);
            User.findOneAndUpdate(
              { email: userEmail },
              { calendarID: calendar.data.id },
              { new: true }
            )
              .then((user) => {
                return res.json({
                  success: true,
                  message: user.calendarID,
                });
              })
              .catch((error) => {
                return res.json({
                  success: false,
                  message: "Error with updating new calendar",
                });
              });
          }
        );
      });
    });
  }
};

/*
const getCalendarEvents = (req, res) => {
  // Load client secrets from a local file.
  fs.readFile(secretPath, { encoding: "utf-8" }, async (err, content) => {
    if (err) {
      return res.json({
        success: false,
        message: "Error with loading client secret file:" + err,
      });
    }
    // Authorize a client with credentials
    let credentials = JSON.parse(content);

    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );

    fs.readFile(TOKEN_PATH, { encoding: "utf-8" }, (err, token) => {
      if (err) {
        return res.json({
          success: false,
          message: "Error with setting token: " + err,
        });
      }
      console.log("1");
      oAuth2Client.setCredentials(JSON.parse(token));

      const calendar = google.calendar({ version: "v3", oAuth2Client });
      calendar.events.list(
        {
          calendarId: "primary",
          timeMin: new Date().toISOString(),
          maxResults: 10,
          singleEvents: true,
          orderBy: "startTime",
        },
        (err, res) => {
          if (err) return console.log("The API returned an error: " + err);
          const events = res.data.items;
          if (events.length) {
            console.log("Upcoming 10 events:");
            events.map((event, i) => {
              const start = event.start.dateTime || event.start.date;
              console.log(`${start} - ${event.summary}`);
            });
          } else {
            console.log("No upcoming events found.");
          }
        }
      );
    });
  });
};*/

module.exports = {
  authorizeCalendar,
  createCalendarToken,
  addCalendarEvent,
  getCalendarID,
};
