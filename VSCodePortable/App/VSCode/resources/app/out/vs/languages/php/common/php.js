/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
var __extends=this&&this.__extends||function(e,t){function n(){this.constructor=e}for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)},__decorate=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,s=3>i?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>i?o(s):i>3?o(t,n,s):o(t,n))||s);return i>3&&s&&Object.defineProperty(t,n,s),s},__param=this&&this.__param||function(e,t){return function(n,r){t(n,r,e)}};define("vs/languages/php/common/php",["require","exports","vs/base/common/objects","vs/editor/common/modes","vs/editor/common/modes/abstractMode","vs/editor/common/modes/abstractState","vs/editor/common/services/modeService","vs/editor/common/modes/supports/richEditSupport","vs/editor/common/modes/supports/tokenizationSupport","vs/editor/common/modes/supports/suggestSupport","vs/editor/common/services/editorWorkerService"],function(e,t,n,r,o,i,s,a,p,c,u){"use strict";var l=function(){for(var e=[{tokenType:"delimiter.bracket.php",open:"{",close:"}"},{tokenType:"delimiter.array.php",open:"[",close:"]"},{tokenType:"delimiter.parenthesis.php",open:"(",close:")"}],t=Object.create(null),n=0;n<e.length;n++){var o=e[n];t[o.open]={tokenType:o.tokenType,bracketType:r.Bracket.Open},t[o.close]={tokenType:o.tokenType,bracketType:r.Bracket.Close}}return{stringIsBracket:function(e){return!!t[e]},tokenTypeFromString:function(e){return t[e].tokenType},bracketTypeFromString:function(e){return t[e].bracketType}}}(),h="+-*%&|^~!=<>(){}[]/?;:.,@",f="+-*/%&|^~!=<>(){}[]\"'\\/?;:.,#",d="	 ",g=n.createKeywordMatcher(["abstract","and","array","as","break","callable","case","catch","cfunction","class","clone","const","continue","declare","default","do","else","elseif","enddeclare","endfor","endforeach","endif","endswitch","endwhile","extends","false","final","for","foreach","function","global","goto","if","implements","interface","instanceof","insteadof","namespace","new","null","object","old_function","or","private","protected","public","resource","static","switch","throw","trait","try","true","use","var","while","xor","die","echo","empty","exit","eval","include","include_once","isset","list","require","require_once","return","print","unset","__construct"]),m=n.createKeywordMatcher(["__CLASS__","__DIR__","__FILE__","__LINE__","__NAMESPACE__","__METHOD__","__FUNCTION__","__TRAIT__"]),y=n.createKeywordMatcher(["$GLOBALS","$_SERVER","$_GET","$_POST","$_FILES","$_REQUEST","$_SESSION","$_ENV","$_COOKIE","$php_errormsg","$HTTP_RAW_POST_DATA","$http_response_header","$argc","$argv"]),_=function(e){return h.indexOf(e)>-1},S=function(e){return"$"===e[0]},k=function(e){function t(t,n,r,o){void 0===o&&(o=""),e.call(this,t),this.name=n,this.parent=r,this.whitespaceTokenType=o}return __extends(t,e),t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n)&&this.name===n.name&&this.whitespaceTokenType===n.whitespaceTokenType&&i.AbstractState.safeEquals(this.parent,n.parent):!1},t.prototype.tokenize=function(e){return e.setTokenRules(f,d),e.skipWhitespace().length>0?{type:this.whitespaceTokenType}:this.stateTokenize(e)},t.prototype.stateTokenize=function(e){throw new Error("To be implemented")},t}(i.AbstractState);t.PHPState=k;var v=function(e){function t(t,n,r,o){void 0===o&&(o=!0),e.call(this,t,"string",n,"string.php"),this.delimiter=r,this.isAtBeginning=o}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent),this.delimiter,this.isAtBeginning)},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n)&&this.delimiter===n.delimiter&&this.isAtBeginning===n.isAtBeginning:!1},t.prototype.tokenize=function(e){var t=this.isAtBeginning?1:0;for(this.isAtBeginning=!1;!e.eos();){var n=e.next();if("\\"===n){if(0!==t)return e.goBack(1),{type:"string.php"};if(e.eos())return{type:"string.php",nextState:this.parent};e.next()}else if(n===this.delimiter)return{type:"string.php",nextState:this.parent};t+=1}return{type:"string.php"}},t}(k);t.PHPString=v;var x=function(e){function t(t,n,r){e.call(this,t,"number",n),this.firstDigit=r}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent),this.firstDigit)},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n)&&this.firstDigit===n.firstDigit:!1},t.prototype.tokenize=function(e){var t=this.firstDigit,n=10,r=!1,i=!1;if("0"===t&&!e.eos()){if(t=e.peek(),"x"===t.toLowerCase())n=16;else if("b"===t.toLowerCase())n=2;else if("."===t)n=10;else{if(!o.isDigit(t,8))return{type:"number.php",nextState:this.parent};n=8}e.next()}for(;!e.eos();)if(t=e.peek(),o.isDigit(t,n))e.next();else if(10===n)if("."!==t||i||r){if("e"!==t||i)break;i=!0,e.next(),e.eos()||"-"!==e.peek()||e.next()}else r=!0,e.next();else{if(8!==n||!o.isDigit(t,10))break;n=10,e.next()}var s="number";return 16===n?s+=".hex":8===n?s+=".octal":2===n&&(s+=".binary"),{type:s+".php",nextState:this.parent}},t}(k);t.PHPNumber=x;var b=function(e){function t(t,n){e.call(this,t,"comment",n,"comment.php")}return __extends(t,e),t.prototype.makeClone=function(){return new T(this.getMode(),i.AbstractState.safeClone(this.parent))},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n):!1},t.prototype.tokenize=function(e){for(;!e.eos();){var t=e.next();if("?"===t&&!e.eos()&&">"===e.peek())return e.goBack(1),{type:"comment.php",nextState:this.parent}}return{type:"comment.php",nextState:this.parent}},t}(k);t.PHPLineComment=b;var T=function(e){function t(t,n){e.call(this,t,"comment",n,"comment.php")}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent))},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n):!1},t.prototype.tokenize=function(e){for(;!e.eos();){var t=e.next();if("*"===t&&!e.eos()&&!e.peekWhitespace()&&"/"===e.peek())return e.next(),{type:"comment.php",nextState:this.parent}}return{type:"comment.php"}},t}(k);t.PHPDocComment=T;var w=function(e){function t(t,n){e.call(this,t,"expression",n)}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent))},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n):!1},t.prototype.stateTokenize=function(e){if(o.isDigit(e.peek(),10))return{nextState:new x(this.getMode(),this,e.next())};if(e.advanceIfString("?>").length)return{type:"metatag.php",nextState:this.parent,bracket:r.Bracket.Close};var t=e.nextToken();if(g(t.toString().toLowerCase()))return{type:"keyword.php"};if(m(t))return{type:"constant.php"};if(y(t))return{type:"variable.predefined.php"};if(S(t))return{type:"variable.php"};if("/"===t){if(!e.eos()&&!e.peekWhitespace())switch(e.peekToken()){case"/":return{nextState:new b(this.getMode(),this)};case"*":return e.nextToken(),{nextState:new T(this.getMode(),this)}}}else{if("#"===t)return{nextState:new b(this.getMode(),this)};if('"'===t||"'"===t)return{nextState:new v(this.getMode(),this,t)};if(l.stringIsBracket(t))return{bracket:l.bracketTypeFromString(t),type:l.tokenTypeFromString(t)};if(_(t))return{type:"delimiter.php"}}return{type:""}},t}(k);t.PHPStatement=w;var M=function(e){function t(t,n){e.call(this,t,"plain",n)}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent))},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n):!1},t.prototype.stateTokenize=function(e){return e.advanceIfStringCaseInsensitive("<?php").length||e.advanceIfString("<?=").length||e.advanceIfString("<%=").length||e.advanceIfString("<?").length||e.advanceIfString("<%").length?{type:"metatag.php",nextState:new w(this.getMode(),new C(this.getMode(),this.parent)),bracket:r.Bracket.Open}:(e.next(),{type:""})},t}(k);t.PHPPlain=M;var C=function(e){function t(t,n){e.call(this,t,"enterHTML",n)}return __extends(t,e),t.prototype.makeClone=function(){return new t(this.getMode(),i.AbstractState.safeClone(this.parent))},t.prototype.equals=function(n){return n instanceof t?e.prototype.equals.call(this,n):!1},t}(k);t.PHPEnterHTMLState=C;var P=function(e){function t(t,n,r){e.call(this,t.id),this.modeService=n,this.tokenizationSupport=new p.TokenizationSupport(this,this,!0,!1),this.richEditSupport=new a.RichEditSupport(this.getId(),null,{wordPattern:o.createWordRegExp("$_"),comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],__characterPairSupport:{autoClosingPairs:[{open:"{",close:"}",notIn:["string.php"]},{open:"[",close:"]",notIn:["string.php"]},{open:"(",close:")",notIn:["string.php"]},{open:'"',close:'"',notIn:["string.php"]},{open:"'",close:"'",notIn:["string.php"]}]}}),this.suggestSupport=new c.TextualSuggestSupport(this.getId(),r)}return __extends(t,e),t.prototype.asyncCtor=function(){return this.modeService.getOrCreateMode("text/html")},t.prototype.getInitialState=function(){var e=this.modeService.getMode("text/html"),t=e.tokenizationSupport.getInitialState();return t.setStateData(new C(this,null)),t},t.prototype.enterNestedMode=function(e){return e instanceof C},t.prototype.getNestedModeInitialState=function(e){var t=e.parent;return e.parent=null,{state:t,missingModePromise:null}},t.prototype.getLeavingNestedModeData=function(e,t){var n=/<\?/i.exec(e);return null!==n?{nestedModeBuffer:e.substring(0,n.index),bufferAfterNestedMode:e.substring(n.index),stateAfterNestedMode:new M(this,null)}:null},t.prototype.onReturningFromNestedMode=function(e,t){e.parent=t},t=__decorate([__param(1,s.IModeService),__param(2,u.IEditorWorkerService)],t)}(o.AbstractMode);t.PHPMode=P});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/5b5f4db87c10345b9d5c8d0bed745bcad4533135/vs\languages\php\common\php.js.map
