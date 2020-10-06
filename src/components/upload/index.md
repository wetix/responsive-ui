| Property        | Description                       | Type               | Default             |
| --------------- | --------------------------------- | ------------------ | ------------------- |
| name            | The name of uploading file        | string             | `file`              |
| disabled        | Disable upload button             | bool               | false               |
| method          | The http method of upload request | string             | `post`              |
| url             |                                   | string             | -                   |
| headers         | The headers of upload request     | Map<string,string> | -                   |
| accept          | The accept                        | string             | `.jpg, .jpeg, .png` |
| timeout         | Timeout of the upload request     | number             | 10000 (10sec)       |
| withCredentials |                                   | string             | false               |
| multiple        | Multiple of file upload           | bool               | false               |
