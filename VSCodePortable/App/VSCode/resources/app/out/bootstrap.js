/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function safeStringify(e){var r,t=[];try{r=JSON.stringify(e,function(e,r){if(r&&"[object Object]"===Object.prototype.toString.call(r)){if(-1!==t.indexOf(r))return Object.create(null);t.push(r)}return r})}catch(n){return"Output omitted for an object that cannot be inspected ("+n.toString()+")"}return r&&r.length>MAX_LENGTH?"Output omitted for a large object that exceeds the limits":r}function uriFromPath(e){var r=path.resolve(e).replace(/\\/g,"/");return r.length>0&&"/"!==r.charAt(0)&&(r="/"+r),encodeURI("file://"+r)}if(process.send&&"true"===process.env.PIPE_LOGGING){var MAX_LENGTH=1e5;"true"===process.env.VERBOSE_LOGGING?(console.log=function(){process.send({type:"__$console",severity:"log",arguments:safeStringify(arguments)})},console.warn=function(){process.send({type:"__$console",severity:"warn",arguments:safeStringify(arguments)})}):(console.log=function(){},console.warn=function(){}),console.error=function(){process.send({type:"__$console",severity:"error",arguments:safeStringify(arguments)})};var stream=require("stream"),writable=new stream.Writable({write:function(e,r,t){}});process.__defineGetter__("stdout",function(){return writable}),process.__defineGetter__("stderr",function(){return writable}),process.__defineGetter__("stdin",function(){return writable})}process.on("uncaughtException",function(e){console.error("Uncaught Exception: ",e.toString()),e.stack&&console.error(e.stack)});var path=require("path"),loader=require("./vs/loader");loader.config({baseUrl:uriFromPath(path.join(__dirname,"..")),paths:{vs:path.basename(__dirname)+"/vs"},catchError:!0,nodeRequire:require,nodeMain:__filename});var entrypoint=process.env.AMD_ENTRYPOINT;entrypoint&&loader([entrypoint],function(){},function(e){console.error(e)});