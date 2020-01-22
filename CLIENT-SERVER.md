# How a Request Get Served
Web browsers communicate with web servers using the HyperText Transfer Protocol (HTTP). When you click a link on a web page, submit a form, or run a search, the browser sends an HTTP Request to the server.

This request includes:

- A URL identifying the target server and resource (e.g. an HTML file).
- A method that defines the required action. The different methods and their associated actions are listed below:
  * [GET] -Get a specific resource (e.g. an HTML file containing information about a product, or a list of products). 
  * [POST] -Create a new resource (e.g. add a new contact to a database). 
  * [HEAD] -Get the metadata information about a specific resource without getting the body like GET would. You might for example use a HEAD request to find out the last time a resource was updated, and then only use the (more "expensive") GET request to download the resource if it has changed. 
  * [PUT] -Update an existing resource (or create a new one if it doesn't exist).
  * [DELETE] -Delete the specified resource.
  * [TRACE, OPTIONS, CONNECT, PATCH] -These verbs are for less common/advanced tasks, so we won't cover them here.

Web servers wait for client request messages, process them when they arrive, and reply to the web browser with an HTTP Response message. The response contains an HTTP Response status code indicating whether or not the request succeeded. The body of a successful response to a GET request would contain the requested resource.

When an HTML page is returned it is rendered by the web browser. As part of processing the browser may discover links to other resources (e.g. an HTML page usually references JavaScript and CSS pages), and will send separate HTTP Requests to download these files.  
  
