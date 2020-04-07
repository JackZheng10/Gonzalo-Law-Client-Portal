## How to run locally

### Assuming you are on a branch of master:

1. Add a file named config.js in ./server/config with the following setup inside: <br/>

```
module.exports = {
    db: {
        uri: '', //place the URI of your MongoDB database here
    }
};
```

2. To go baseURL.js in client/src and set the variable to the local version as specified in the comments of the code.<br/>

3. Run `npm install` from the root and client directory. <br/>

4. Finally, run `npm run dev` from the root directory, which will launch both the frontend and backend.<br/>
