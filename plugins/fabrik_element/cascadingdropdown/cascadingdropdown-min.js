var FbCascadingdropdown=new Class({Extends:FbDatabasejoin,initialize:function(b,a){var c=null;this.ignoreAjax=false;this.plugin="cascadingdropdown";this.parent(b,a);if(document.id(this.options.watch)){document.id(this.options.watch).addEvent("change",function(d){this.dowatch(d)}.bind(this))}if(this.options.showDesc===true){this.element.addEvent("change",function(d){this.showDesc(d)}.bind(this))}this.watchJoinCheckboxes();this.spinner=new Spinner(this.element.getParent(".fabrikElementContainer"))},attachedToForm:function(){if(this.ignoreAjax||(this.options.editable&&!this.options.editing)){var a=this.form.formElements.get(this.options.watch).getValue();this.change(a,document.id(this.options.watch).id)}},dowatch:function(b){var a=Fabrik.blocks[this.form.form.id].formElements[this.options.watch].getValue();this.change(a,b.target.id)},change:function(b,f){if(window.ie){if(this.options.repeatCounter.toInt()===0){var d=f.substr(f.length-2,1);var c=f.substr(f.length-1,1);if(d==="_"&&typeOf(parseInt(c,10))==="number"&&c!=="0"){return}}}this.spinner.show();var a=this.form.getFormElementData();var e={option:"com_fabrik",format:"raw",task:"plugin.pluginAjax",plugin:"cascadingdropdown",method:"ajax_getOptions",element_id:this.options.id,v:b,formid:this.form.id,fabrik_cascade_ajax_update:1,lang:this.options.lang};e=Object.append(a,e);if(this.myAjax){this.myAjax.cancel()}this.myAjax=new Request({url:"",method:"post",data:e,onSuccess:function(g){var j=this.options.def,i={},l;this.spinner.hide();g=JSON.decode(g);if(this.options.editable){this.destroyElement()}else{this.element.getElements("div").destroy()}if(this.options.showDesc===true){l=this.getContainer().getElement(".dbjoin-description");l.empty()}this.myAjax=null;if(!this.ignoreAjax){g.each(function(m){i=m.value===j?{value:m.value,selected:"selected"}:{value:m.value};if(this.options.editable===false){m.text=m.text.replace(/\n/g,"<br />");new Element("div").set("html",m.text).inject(this.element)}else{this.addOption(m.value,m.text)}if(this.options.showDesc===true&&m.description){var n=this.options.showPleaseSelect?"notice description-"+(k):"notice description-"+(k-1);new Element("div",{styles:{display:"none"},"class":n}).set("html",m.description).inject(l)}}.bind(this))}else{if(this.options.showPleaseSelect&&g.length>0){var h=g.shift();if(this.options.editable===false){new Element("div").set("text",h.text).inject(this.element)}else{this.addOption(h.value,h.text);new Element("option",{value:h.value,selected:"selected"}).set("text",h.text).inject(this.element)}}}this.ignoreAjax=false;if(this.options.editable&&this.options.displayType==="dropdown"){if(this.element.options.length===1){this.element.readonly=true;this.element.addClass("readonly")}else{this.element.readonly=false;this.element.removeClass("readonly")}}if(!this.ignoreAjax){this.ingoreShowDesc=true;this.element.fireEvent("change",new Event.Mock(this.element,"change"));this.ingoreShowDesc=false}this.ignoreAjax=false;Fabrik.fireEvent("fabrik.cdd.update",this)}.bind(this),onFailure:function(g){console.log(this.myAjax.getHeader("Status"))}.bind(this)}).send()},destroyElement:function(){switch(this.options.displayType){case"radio":case"checkbox":this.getContainer().getElements(".fabrik_subelement").destroy();break;case"dropdown":default:this.element.empty();break}},cloned:function(a){this.myAjax=null;this.parent(a);if(document.id(this.options.watch)){if(this.options.watchInSameGroup===true){if(this.options.watch.test(/_(\d+)$/)){this.options.watch=this.options.watch.replace(/_(\d+)$/,"_"+a)}else{this.options.watch=this.options.watch+"_"+a}}if(document.id(this.options.watch)){document.id(this.options.watch).removeEvents("change",function(b){this.dowatch(b)}.bind(this));document.id(this.options.watch).addEvent("change",function(b){this.dowatch(b)}.bind(this))}}if(this.options.watchInSameGroup===true){this.element.empty();this.ignoreAjax=true}if(this.options.showDesc===true){this.element.addEvent("change",function(){this.showDesc()}.bind(this))}Fabrik.fireEvent("fabrik.cdd.update",this)},showDesc:function(d){if(this.ingoreShowDesc===true){return}var b=document.id(d.target).selectedIndex;var f=this.getContainer().getElement(".dbjoin-description");var a=f.getElement(".description-"+b);f.getElements(".notice").each(function(e){if(e===a){var c=new Fx.Style(a,"opacity",{duration:400,transition:Fx.Transitions.linear});c.set(0);e.show();c.start(0,1)}else{e.hide()}}.bind(this))}});