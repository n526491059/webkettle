var activeGraph = null;

Ext.onReady(function() {
	
	Ext.QuickTips.init();
	Ext.MessageBox.buttonText.yes = '确定';
	Ext.MessageBox.buttonText.ok = '好的';
	Ext.MessageBox.buttonText.no = '否';
	Ext.MessageBox.buttonText.cancel = '取消';
	/**
	 *初始化面板
	 */

	var init = function() {
		var tabPanel = new Ext.TabPanel({
			id: 'TabPanel',
			region: 'center',
			border: true,
			collapsible: true,

		});
		var navigationPanel = new Ext.Panel({
			id: 'navigationPanel',
			region: 'north',
			height: 50,
			border: false,
			margin: '0,0,0,0',
			bodyStyle: {
				background: '#3992D4'
			},
		});
		var footPanel = new Ext.Panel({
			id: 'footPanel',
			region: 'south',
			height: 30,
			border: false,
			margin: '0,0,0,0',
			bodyStyle: {
				background: '#3992D4'
			},
		});


		var guidePanel = new GuidePanel({
			id: 'GuidePanel',
			split: true,
			region: 'west',
			width: 400,
			layout: 'border',
			items:[
				fristGuidePanel,
				secondGuidePanel
			],
		});


		tabPanel.on('tabchange', function(me, item) {
			if(item) {
				activeGraph = item;
				guidePanel.activeCom(item);
				//secondGuidePanel.activeCom(item);
			} else {
				activeGraph = null;
				guidePanel.activeCom(null);
				//secondGuidePanel.activeCom(null);
			}
		});

	    new Ext.Viewport({
			layout: 'border',
			items: [navigationPanel,guidePanel,tabPanel,footPanel]
		});
	};
	
//	Ext.Ajax.request({
//		url: GetUrl('system/getSystem.do'),
//		success: function(response) {
//			if(response.responseText == 'access forbidden') {
//				var dialog = new RepositoriesDialog();
//				dialog.on('loginSuccess', function() {
//					dialog.close();
//					init();
//				});
//				dialog.show();
//			} else {
//				init();
//			}
//			
//		    setTimeout(function(){
//		    	Ext.get('loading').hide();
//		        Ext.get('loading-mask').fadeOut();
//		    }, 250);
//		}
//	});

	 init();

	 setTimeout(function(){
		 Ext.get('loading').hide();
		 Ext.get('loading-mask').fadeOut();
	 }, 250);

    
});

function treeClick(node, e) {
	if (node.isLeaf()) {

		var guide =  Ext.getCmp('secondGuidePanel');
		if(node.id=='newTrans'){

			guide.removeAll();
			guide.add('transGuidePanel');
			guide.doLayout();
			Ext.getBody().mask('正在创建转换，请稍后...');

			Ext.Ajax.request({
				url: GetUrl('task/getRepositoryDir.do'),
				method: 'POST',
				//params: {dir: node.attributes.path, transName: text},
				success: function(response) {
					// try {
					// 	var path = Ext.decode(response.responseText).message;
					// 	node.reload(function() {
					// 		var child = node.findChild('path', path);
					// 		child && child.select();
					// 		me.openGraph();
					// 	});
					// } finally {
					// 	Ext.getBody().unmask();
					// }
				},
				failure: failureResponse
			});
			//secondGuidePanel.show();

		}else if(node.id=='newJob'){
			guide.removeAll();
			guide.add('jobGuidePanel');
			guide.doLayout();
			//secondGuidePanel.show();
		}
	}
}
fristGuidePanel.on('click', treeClick);

function syncCall(cfg) {
	var conn = null;
	try {
		conn = new XMLHttpRequest();
    } catch(e) {
        for (var i = Ext.isIE6 ? 1 : 0; i < activeX.length; ++i) {
            try {
            	conn = new ActiveXObject(activeX[i]);
                break;
            } catch(e) {
            	
            }
        }
    }
    var jsonData = cfg.params || {};
    var p = Ext.isObject(jsonData) ? Ext.urlEncode(jsonData) : jsonData;
    
    var url = cfg.url;
    url = Ext.urlAppend(url, p);
    
    conn.open(cfg.method || 'POST', url, false);
    conn.send(null);
    if (conn.status == "200") {  
    	return conn.responseText;  
    }  
    return null;
}

Ext.override(Ext.util.MixedCollection, {
	getString: function(str, key) {
		return this.get(key);
	}
});

var loadCache = new Ext.util.MixedCollection();
var BaseMessages = new Ext.util.MixedCollection(), PKG = null;
function loadPluginScript(pluginId) {
	if(!pluginId) return;
	
	if(!loadCache.containsKey(pluginId)) {
		var oHead = document.getElementsByTagName('HEAD').item(0);
	    var oScript= document.createElement("script");
	    oScript.type = "text/javascript";
	    oScript.src = GetUrl('ui/stepjs/' + pluginId + '.js2');
	    oHead.appendChild( oScript ); 
		
		loadCache.add(pluginId, 1);
	}
}

function findItems(c, name, v) {
	var arrays = [];
	if(c.items) {
		c.items.each(function(t) {
			if(t[name] == v)
				arrays.push(t);
			Ext.each(findItems(t, name, v), function(e) {
				arrays.push(e);
			});
		});
	}
	return arrays;
}

function getActiveGraph() {
	return activeGraph;
}

function decodeResponse(response, cb, opts) {
	try {
		var resinfo = Ext.decode(response.responseText);
		if(resinfo.success) {
			cb(resinfo);
		} else {
			Ext.Msg.show({
			   title: resinfo.title,
			   msg: resinfo.message,
			   buttons: Ext.Msg.OK,
			   icon: Ext.MessageBox.ERROR
			});
		}
		Ext.getBody().unmask();
	} finally {
		Ext.getBody().unmask();
	}
}

function failureResponse(response) {
	Ext.getBody().unmask();
	if(response.status == 0 && !response.responseText) {
		Ext.Msg.show({
		   title: '系统提示',
		   msg: '服务器繁忙或宕机，请确认服务器状态！',
		   buttons: Ext.Msg.OK,
		   icon: Ext.MessageBox.WARNING
		});
	} else if(response.status == 500) {
		var noText = Ext.MessageBox.buttonText.no;
		Ext.MessageBox.buttonText.no = '查看详细';
		Ext.Msg.show({
		   title: '系统提示',
		   msg: '系统发生错误！错误信息：' + response.statusText,
		   buttons: Ext.Msg.YESNOCANCEL,
		   fn: function(bId) {
			   Ext.MessageBox.buttonText.no = noText;
			   if(bId == 'no') {
				   var win = new Ext.Window({
					   width: 1000,
					   height: 600,
					   title: '详细错误',
					   modal: true,
					   layout: 'fit',
					   items: new Ext.form.TextArea({
						   	value: decodeURIComponent(response.responseText),
							readOnly : true
					   }),
					   bbar: ['->', {
						   text: '确定', handler: function() {win.close();}
					   }]
				   });
				   win.show();
			   }
		   },
		   icon: Ext.MessageBox.ERROR
		});
	}
}

mxPopupMenu.prototype.zIndex = 100000;

mxGraph.prototype.isHtmlLabel = function(	cell	) {
	return true;
}

function NoteShape()
{
	mxCylinder.call(this);
};
mxUtils.extend(NoteShape, mxCylinder);
NoteShape.prototype.size = 10;
NoteShape.prototype.redrawPath = function(path, x, y, w, h, isForeground)
{
	var s = Math.min(w, Math.min(h, mxUtils.getValue(this.style, 'size', this.size)));

	if (isForeground)
	{
		path.moveTo(w - s, 0);
		path.lineTo(w - s, s);
		path.lineTo(w, s);
		path.end();
	}
	else
	{
		path.moveTo(0, 0);
		path.lineTo(w - s, 0);
		path.lineTo(w, s);
		path.lineTo(w, h);
		path.lineTo(0, h);
		path.lineTo(0, 0);
		path.close();
		path.end();
	}
};

mxCellRenderer.prototype.defaultShapes['note'] = NoteShape;

NoteShape.prototype.constraints = [new mxConnectionConstraint(new mxPoint(0.25, 0), true),
                                   new mxConnectionConstraint(new mxPoint(0.5, 0), true),
                                   new mxConnectionConstraint(new mxPoint(0.75, 0), true),
 	              		 new mxConnectionConstraint(new mxPoint(0, 0.25), true),
 	              		 new mxConnectionConstraint(new mxPoint(0, 0.5), true),
 	              		 new mxConnectionConstraint(new mxPoint(0, 0.75), true),
 	            		 new mxConnectionConstraint(new mxPoint(1, 0.25), true),
 	            		 new mxConnectionConstraint(new mxPoint(1, 0.5), true),
 	            		 new mxConnectionConstraint(new mxPoint(1, 0.75), true),
 	            		 new mxConnectionConstraint(new mxPoint(0.25, 1), true),
 	            		 new mxConnectionConstraint(new mxPoint(0.5, 1), true),
 	            		 new mxConnectionConstraint(new mxPoint(0.75, 1), true)];

Ext.override(Ext.data.Store, {
	toArray: function(fields) {
		var data = [];
		this.each(function(rec) {
			var obj = new Object();
			Ext.each(fields, function(field) {
				if(Ext.isString(field))
					obj[field] = rec.get(field);
				else if(Ext.isObject(field)) {
					if(field.value)
						obj[field.name] = field.value;
					else
						obj[field.name] = rec.get(field.field);
				}
			});
			data.push(obj);
		});
		return data;
	},
	toJson: function() {
		var data = [];
		this.each(function(rec) {
			var obj = new Object();
			rec.fields.each(function(field) {
				obj[field.name] = rec.get(field.name);
			});
			data.push(obj);
		});
		return data;
	},
	merge: function(store, fields) {
		var me = this;
		if(store.getCount() <= 0) return;
		var data = store.toArray(fields);
		
		if(this.getCount() > 0) {
			var answerDialog = new AnswerDialog({has: me.getCount(), found: data.length});
			answerDialog.on('addNew', function() {
				me.loadData(data, true);
			});
			answerDialog.on('addAll', function() {
				Ext.each(data, function(d) {
	                var record = new store.recordType(d);
	                me.insert(0, record);
				});
			});
			answerDialog.on('clearAddAll', function() {
				me.removeAll();
				me.loadData(data);
			});
			answerDialog.show();
		} else {
			me.loadData(data);
		}
	}
});

