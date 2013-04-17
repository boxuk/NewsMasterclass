function ApplicationWindow() {
	//declare module dependencies
	var HomeView = require('ui/common/HomeView'),
        SectionView = require('ui/common/SectionView'),
        OpenPlatformClient = require('openplatform/Client');
		
	//create object instance
	var self = Ti.UI.createWindow({
		title:'OpenPlatform Browser',
		exitOnClose:true,
		navBarHidden:false,
		backgroundColor:'#ffffff'
	});
	
	//read parameters
    var fileName = 'parameters.json';
    var file = Titanium.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory, fileName);
     
    if (file.exists()) {
      var parameters = JSON.parse(file.read());
    }
    
    var client = new OpenPlatformClient(parameters.apiKey);
        
	//construct UI
	var homeView = new HomeView();
	self.add(homeView);

	//add behavior for master view
	homeView.addEventListener('sectionSelected', function(e) {
		//create detail view container
		var sectionView = new SectionView(client);
		var sectionContainerWindow = Ti.UI.createWindow({
			title:'Section',
			navBarHidden:false,
			backgroundColor:'#ffffff'
		});
		sectionContainerWindow.add(sectionView);
		sectionView.fireEvent('sectionSelected',e);
		sectionContainerWindow.open();
	});
	
	return self;
};

module.exports = ApplicationWindow;
