1、系统采用单资源库模式，数据源连接在dispatch-servlet.xml中配置，系统启动后就会读取该资源库
2、数据库脚本都在kettle-scheduler项目的scripts目录下
3、本例使用Maven3.2.3构建，启动jetty后访问http://localhost:8080/kw
4、支持IE9及以上、FireFox等浏览器，IE6-IE8需要做特殊化处理，其他浏览器未测试

