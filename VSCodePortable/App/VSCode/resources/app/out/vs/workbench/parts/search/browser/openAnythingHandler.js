/*!--------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/
define("vs/nls!vs/workbench/parts/search/browser/openFileHandler",["vs/nls","vs/nls!vs/workbench/parts/search/browser/openAnythingHandler"],function(e,t){return e.create("vs/workbench/parts/search/browser/openFileHandler",t)}),define("vs/nls!vs/workbench/parts/search/browser/openSymbolHandler",["vs/nls","vs/nls!vs/workbench/parts/search/browser/openAnythingHandler"],function(e,t){return e.create("vs/workbench/parts/search/browser/openSymbolHandler",t)});var __decorate=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=3>i?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>i?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define("vs/workbench/parts/search/common/searchQuery",["require","exports","vs/base/common/objects","vs/platform/search/common/search","vs/platform/configuration/common/configuration"],function(e,t,r,n,o){"use strict";function i(e){var t=e&&e.files&&e.files.exclude,n=e&&e.search&&e.search.exclude;if(!t&&!n)return null;if(!t||!n)return t||n;var o=Object.create(null);return o=r.mixin(o,t),o=r.mixin(o,n,!0)}t.getExcludes=i;var s=function(){function e(e){this.configurationService=e}return e.prototype.text=function(e,t){return this.query(n.QueryType.Text,e,t)},e.prototype.file=function(e){return this.query(n.QueryType.File,null,e)},e.prototype.query=function(e,t,n){return void 0===n&&(n={}),this.configurationService.loadConfiguration().then(function(o){var s=i(o);return n.excludePattern?r.mixin(n.excludePattern,s,!1):n.excludePattern=s,{type:e,folderResources:n.folderResources,extraFileResources:n.extraFileResources,filePattern:n.filePattern,excludePattern:n.excludePattern,includePattern:n.includePattern,maxResults:n.maxResults,fileEncoding:n.fileEncoding,contentPattern:t}})},e=__decorate([__param(0,o.IConfigurationService)],e)}();t.QueryBuilder=s});var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=3>i?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>i?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define("vs/workbench/parts/search/browser/openFileHandler",["require","exports","vs/base/common/winjs.base","vs/nls!vs/workbench/parts/search/browser/openFileHandler","vs/base/common/paths","vs/base/common/labels","vs/base/parts/quickopen/browser/quickOpenModel","vs/workbench/browser/quickopen","vs/workbench/parts/search/common/searchQuery","vs/workbench/parts/files/common/files","vs/workbench/services/editor/common/editorService","vs/platform/configuration/common/configuration","vs/platform/instantiation/common/instantiation","vs/platform/message/common/message","vs/platform/search/common/search","vs/platform/workspace/common/workspace"],function(e,t,r,n,o,i,s,a,c,u,l,p,h,f,m,d){"use strict";var v=function(e){function t(t,r,n,o,i,s){e.call(this,o),this.instantiationService=i,this.resource=n,this.name=t,this.description=r}return __extends(t,e),t.prototype.getLabel=function(){return this.name},t.prototype.getAriaLabel=function(){return n.localize(0,null,this.getLabel())},t.prototype.getDescription=function(){return this.description},t.prototype.getIcon=function(){return"file"},t.prototype.getResource=function(){return this.resource},t.prototype.setRange=function(e){this.range=e},t.prototype.getInput=function(){var e={resource:this.resource};return this.range&&(e.options={selection:this.range}),e},t=__decorate([__param(3,l.IWorkbenchEditorService),__param(4,h.IInstantiationService),__param(5,d.IWorkspaceContextService)],t)}(a.EditorQuickOpenEntry);t.FileEntry=v;var g=function(e){function t(t,r,n,o,i,s,a){e.call(this),this.editorService=t,this.messageService=r,this.instantiationService=n,this.configurationService=o,this.contextService=i,this.textFileService=s,this.searchService=a,this.queryBuilder=this.instantiationService.createInstance(c.QueryBuilder)}return __extends(t,e),t.prototype.getResults=function(e){e=e.trim();var t;return t=e?this.doFindResults(e):r.TPromise.as([]),t.then(function(e){return new s.QuickOpenModel(e)})},t.prototype.doFindResults=function(e){var t=this,r={folderResources:this.contextService.getWorkspace()?[this.contextService.getWorkspace().resource]:[],extraFileResources:this.textFileService.getWorkingFilesModel().getOutOfWorkspaceContextEntries().map(function(e){return e.resource}),filePattern:e};return this.queryBuilder.file(r).then(function(e){return t.searchService.search(e)}).then(function(e){for(var r=[],n=0;n<e.results.length;n++){var s=e.results[n],a=o.basename(s.resource.fsPath),c=i.getPathLabel(o.dirname(s.resource.fsPath),t.contextService);r.push(t.instantiationService.createInstance(v,a,c,s.resource))}return r})},t.prototype.getGroupLabel=function(){return n.localize(1,null)},t.prototype.getAutoFocus=function(e){return{autoFocusFirstEntry:!0}},t=__decorate([__param(0,l.IWorkbenchEditorService),__param(1,f.IMessageService),__param(2,h.IInstantiationService),__param(3,p.IConfigurationService),__param(4,d.IWorkspaceContextService),__param(5,u.ITextFileService),__param(6,m.ISearchService)],t)}(a.QuickOpenHandler);t.OpenFileHandler=g});var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=3>i?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>i?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define("vs/workbench/parts/search/browser/openSymbolHandler",["require","exports","vs/base/common/winjs.base","vs/nls!vs/workbench/parts/search/browser/openSymbolHandler","vs/base/common/async","vs/workbench/browser/quickopen","vs/base/parts/quickopen/browser/quickOpenModel","vs/base/common/filters","vs/base/common/labels","vs/workbench/services/editor/common/editorService","vs/platform/instantiation/common/instantiation","vs/platform/workspace/common/workspace","vs/editor/common/services/modeService","vs/workbench/parts/search/common/search"],function(e,t,r,n,o,i,s,a,c,u,l,p,h,f){"use strict";var m=function(e){function t(t,r,n,o,i,s,a,c){e.call(this,c),this.name=t,this.parameters=r,this.description=n,this.resource=o,this.type=i,this.range=s,this.setHighlights(a)}return __extends(t,e),t.prototype.getLabel=function(){return this.name+this.parameters},t.prototype.getAriaLabel=function(){return n.localize(0,null,this.getLabel())},t.prototype.getName=function(){return this.name},t.prototype.getParameters=function(){return this.parameters},t.prototype.getDescription=function(){return this.description},t.prototype.getType=function(){return this.type},t.prototype.getIcon=function(){return this.type},t.prototype.getInput=function(){var e={resource:this.resource};return this.range&&(e.options={selection:{startLineNumber:this.range.startLineNumber,startColumn:this.range.startColumn}}),e},t}(i.EditorQuickOpenEntry),d=function(e){function t(r,n,i,s){e.call(this),this.editorService=r,this.modeService=n,this.instantiationService=i,this.contextService=s,this.delayer=new o.ThrottledDelayer(t.SEARCH_DELAY),this.isStandalone=!0}return __extends(t,e),t.prototype.setStandalone=function(e){this.delayer=e?new o.ThrottledDelayer(t.SEARCH_DELAY):null,this.isStandalone=e},t.prototype.canRun=function(){return!0},t.prototype.getResults=function(e){var t=this;e=e.trim();var n;return n=e?this.delayer?this.delayer.trigger(function(){return t.doGetResults(e)}):this.doGetResults(e):r.TPromise.as([]),n.then(function(e){return new s.QuickOpenModel(e)})},t.prototype.doGetResults=function(e){var t=this;return f.getNavigateToItems(e).then(function(r){return t.toQuickOpenEntries(r,e)})},t.prototype.toQuickOpenEntries=function(e,r){var n=this,o=[];return e.forEach(function(e){if(t.SUPPORTED_OPEN_TYPES.some(function(t){return e.type===t})){var i=a.matchesFuzzy(r,e.name);if(i){var s=e.resourceUri;if("file"===s.scheme){var u=c.getPathLabel(s,n.contextService),l=void 0;l=e.containerName===u?u:e.containerName===s.toString()&&e.containerName.indexOf("/")>=0?e.containerName.substr(e.containerName.lastIndexOf("/")+1):e.containerName&&e.containerName.indexOf(".")>=0?e.containerName.substr(e.containerName.lastIndexOf(".")+1):e.containerName||u,o.push(new m(e.name,e.parameters,l,s,e.type,e.range,i,n.editorService))}}}}),this.isStandalone?o.sort(this.sort.bind(this,r.toLowerCase())):o},t.prototype.sort=function(e,r,n){var o=r.getName().toLowerCase(),i=n.getName().toLowerCase();if(o===i){var a=r.getType(),c=n.getType();if(a!==c)return t.SUPPORTED_OPEN_TYPES.indexOf(a)<t.SUPPORTED_OPEN_TYPES.indexOf(c)?-1:1}return s.QuickOpenEntry.compare(r,n,e)},t.prototype.getGroupLabel=function(){return n.localize(1,null)},t.prototype.getEmptyLabel=function(e){return e.length>0?n.localize(2,null):n.localize(3,null)},t.prototype.getAutoFocus=function(e){return{autoFocusFirstEntry:!0,autoFocusPrefixMatch:e.trim()}},t.SUPPORTED_OPEN_TYPES=["class","interface","enum","function","method"],t.SEARCH_DELAY=500,t=__decorate([__param(0,u.IWorkbenchEditorService),__param(1,h.IModeService),__param(2,l.IInstantiationService),__param(3,p.IWorkspaceContextService)],t)}(i.QuickOpenHandler);t.OpenSymbolHandler=d});var __extends=this&&this.__extends||function(e,t){function r(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)},__decorate=this&&this.__decorate||function(e,t,r,n){var o,i=arguments.length,s=3>i?t:null===n?n=Object.getOwnPropertyDescriptor(t,r):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,n);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(s=(3>i?o(s):i>3?o(t,r,s):o(t,r))||s);return i>3&&s&&Object.defineProperty(t,r,s),s},__param=this&&this.__param||function(e,t){return function(r,n){t(r,n,e)}};define("vs/workbench/parts/search/browser/openAnythingHandler",["require","exports","vs/base/common/winjs.base","vs/nls!vs/workbench/parts/search/browser/openAnythingHandler","vs/base/common/async","vs/base/common/types","vs/base/common/platform","vs/base/common/scorer","vs/base/common/paths","vs/base/common/labels","vs/base/common/strings","vs/base/parts/quickopen/browser/quickOpenModel","vs/workbench/browser/quickopen","vs/workbench/parts/search/browser/openFileHandler","vs/workbench/parts/search/browser/openSymbolHandler","vs/platform/message/common/message","vs/platform/instantiation/common/instantiation","vs/workbench/services/workspace/common/contextService","vs/platform/configuration/common/configuration"],function(e,t,r,n,o,i,s,a,c,u,l,p,h,f,m,d,v,g,_){"use strict";t.OpenSymbolHandler=m.OpenSymbolHandler;var y=function(e){function h(r,n,i,s){e.call(this),this.messageService=r,this.contextService=n,this.configurationService=s,this.openSymbolHandler=i.createInstance(t.OpenSymbolHandler),this.openFileHandler=i.createInstance(f.OpenFileHandler),this.openSymbolHandler.setStandalone(!1),this.resultsToSearchCache=Object.create(null),this.scorerCache=Object.create(null),this.delayer=new o.ThrottledDelayer(h.SEARCH_DELAY)}return __extends(h,e),h.prototype.getResults=function(e){var t=this;if(e=e.trim(),s.isWindows&&(e=e.replace(/\//g,"\\")),this.cancelPendingSearch(),this.isClosed=!1,!e)return r.TPromise.as(new p.QuickOpenModel);var n=this.extractRange(e);n&&(e=n.search);var o=this.getResultsFromCache(e,n?n.range:null);if(o)return r.TPromise.as(new p.QuickOpenModel(o));var i=function(){var o=!1,i=[];if(n)i.push(r.TPromise.as(new p.QuickOpenModel));else{var s=function(e){return r.TPromise.timeout(e).then(function(){return o?r.TPromise.as(new p.QuickOpenModel):s(h.SYMBOL_SEARCH_SUBSEQUENT_TIMEOUT)})},a=t.openSymbolHandler.getResults(e),c=s(h.SYMBOL_SEARCH_INITIAL_TIMEOUT);i.push(r.TPromise.any([a,c]).then(function(e){return e.value}))}return i.push(t.openFileHandler.getResults(e).then(function(e){return o=!0,e})),t.pendingSearch=r.TPromise.join(i).then(function(o){if(t.pendingSearch=null,t.isClosed)return r.TPromise.as(new p.QuickOpenModel);var i=o[0].entries.concat(o[1].entries),s=l.stripWildcards(e).toLowerCase();i.sort(function(r,n){return p.QuickOpenEntry.compareByScore(r,n,e,s,t.scorerCache)}),i.forEach(function(e){e instanceof f.FileEntry&&e.setRange(n?n.range:null)}),t.resultsToSearchCache[e]=i;var a=i.length>h.MAX_DISPLAYED_RESULTS?i.slice(0,h.MAX_DISPLAYED_RESULTS):i;return a.forEach(function(t){if(t instanceof f.FileEntry){var r=p.QuickOpenEntry.highlight(t,e,!0),n=r.labelHighlights,o=r.descriptionHighlights;t.setHighlights(n,o)}}),r.TPromise.as(new p.QuickOpenModel(a))},function(e){t.pendingSearch=null,t.messageService.show(d.Severity.Error,e)}),t.pendingSearch};return this.delayer.trigger(i)},h.prototype.extractRange=function(e){var t=null,r=h.LINE_COLON_PATTERN.exec(e);if(r&&r.length>1){var n=parseInt(r[1],10);if(i.isNumber(n)){if(t={startLineNumber:n,startColumn:1,endLineNumber:n,endColumn:1},r.length>3){var o=parseInt(r[3],10);i.isNumber(o)&&(t.startColumn=o,t.endColumn=o)}}else""===r[1]&&(t={startLineNumber:1,startColumn:1,endLineNumber:1,endColumn:1})}return t?{search:e.substr(0,r.index),range:t}:null},h.prototype.getResultsFromCache=function(e,t){var r=this;void 0===t&&(t=null);var n;for(var o in this.resultsToSearchCache)if(0===e.indexOf(o)){if(e.indexOf(c.nativeSep)>=0&&o.indexOf(c.nativeSep)<0)continue;n=this.resultsToSearchCache[o];break}if(!n)return null;for(var i=[],s=l.stripWildcards(e).toLowerCase(),m=0;m<n.length;m++){var d=n[m];if(!t||d instanceof f.FileEntry){var v=d.getResource(),g=v?u.getPathLabel(v,this.contextService):d.getLabel();a.matches(g,s)&&i.push(d)}}i.sort(function(t,n){return p.QuickOpenEntry.compareByScore(t,n,e,s,r.scorerCache)}),i.forEach(function(e){e instanceof f.FileEntry&&e.setRange(t)});var _=i.length>h.MAX_DISPLAYED_RESULTS?i.slice(0,h.MAX_DISPLAYED_RESULTS):i;return _.forEach(function(t){var r=p.QuickOpenEntry.highlight(t,e,!0),n=r.labelHighlights,o=r.descriptionHighlights;t.setHighlights(n,o)}),_},h.prototype.getGroupLabel=function(){return n.localize(0,null)},h.prototype.getAutoFocus=function(e){return{autoFocusFirstEntry:!0}},h.prototype.onClose=function(e){this.isClosed=!0,this.cancelPendingSearch(),this.resultsToSearchCache=Object.create(null),this.scorerCache=Object.create(null),this.openSymbolHandler.onClose(e),this.openFileHandler.onClose(e)},h.prototype.cancelPendingSearch=function(){this.pendingSearch&&(this.pendingSearch.cancel(),this.pendingSearch=null)},h.LINE_COLON_PATTERN=/[#|:](\d*)([#|:](\d*))?$/,h.SYMBOL_SEARCH_INITIAL_TIMEOUT=500,h.SYMBOL_SEARCH_SUBSEQUENT_TIMEOUT=100,h.SEARCH_DELAY=300,h.MAX_DISPLAYED_RESULTS=512,h=__decorate([__param(0,d.IMessageService),__param(1,g.IWorkspaceContextService),__param(2,v.IInstantiationService),__param(3,_.IConfigurationService)],h)}(h.QuickOpenHandler);t.OpenAnythingHandler=y});
//# sourceMappingURL=https://ticino.blob.core.windows.net/sourcemaps/f291f4ad600767626b24a4b15816b04bee9a3049/vs\workbench\parts\search\browser\openAnythingHandler.js.map
