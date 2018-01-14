'use strict';
var fs = require('fs');
var pyfiles = require('pyfiles');
var pyfilesCopy = require('pyfiles-copy');
var path = require('path');
var nextFile = 0;
var file = undefined;
module.exports.update = function(){
	var material = copyMaterial();
	var files = getArrayFileMaterial();
	var total = files.length;

		if(total !== undefined){
			replaceStr(files,nextFile,total);
			return copyTheme();
		}

		function copyMaterial(){
			var options = {
				'fromDir': './node_modules/@material',
				'toDir': './dist',
				'formatFile': 'scss',
				'srcFiles': false,
				'cleanToDir': true,
			}
			return pyfilesCopy(options);
		}

		function getArrayFileMaterial(){
			var optionsResult = {
				'fromDir': './dist/@material',
				'formatFile': 'scss',
				'srcFiles': false,
			}
			return pyfiles(optionsResult);
		}

		function readS(file,callback){
			var readFile = fs.ReadStream(file);
			readFile.setEncoding('utf8');
			readFile.on('readable',(chunk = readFile.read())=>{
				readFile.pause();
				writeS(file, chunk);
				readFile.on('end',()=>{
				});
				readFile.on('close',()=>{
				});
			});
		}

		function writeS(file,data){
			if(typeof data === "string"){
			var data = data;
			var regex = new RegExp('@import "@material','g');
			var newTxt = '@import "./node_modules/mdc-sass/dist/@material';
			var newData = data.replace(regex,newTxt);
			if(file.indexOf('/@material/theme/_mixins.scss') !== -1){
				newData = newData.replace('@import', '// @import');
			}
			var writeFile = fs.WriteStream(file);
			writeFile.write(newData);
			writeFile.end('\n');
			}
		}

		function replaceStr(files,nextFile,total){
			var result = false;
			var topTotal = total + 1 ;
			if(topTotal === nextFile)
				 console.log(topTotal, total, nextFile);
			else{
				file = files[nextFile];
				if(file !== undefined){
					readS(file);
					nextFile = nextFile + 1;
					replaceStr(files,nextFile,total);
				};
			}
		}

		function copyTheme(){
			var options = {
				'fromDir': './node_modules/@material/theme',
				'toDir': './dist',
				'formatFile': 'scss',
				'srcFiles': false,
				'cleanToDir': true,
			}
			pyfilesCopy(options);
			return readMdc();
			function readMdc(){
				file = './node_modules/material-components-web/material-components-web.scss'
				var readFile = fs.ReadStream(file);
				readFile.setEncoding('utf8');
				readFile.on('readable',(chunk = readFile.read())=>{
					writeIndex(file,chunk);
					readFile.on('end',()=>{
					});
					readFile.on('close',()=>{
					});
				});
			}

			function writeIndex(file,data){
				file = './dist/theme/index.scss';
				if(typeof data === "string"){
				var regex = new RegExp('@import "@material','g');
				var newTxt = '@import "./node_modules/mdc-sass/dist/@material';
				var newData = data.replace(regex,newTxt);
				var writeFile = fs.WriteStream(file);
				writeFile.write(newData);
				writeFile.end('\n');
				}
			}


		}
}