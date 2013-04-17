function ApplicationWindow() {
	//declare module dependencies
	var HomeView = require('ui/common/HomeView'),
		SectionView = require('ui/common/SectionView'),
		OpenPlatformClient = require('openplatform/Client');
		
	//create object instance
	var self = Ti.UI.createWindow({
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
	var homeView = new HomeView(),
		sectionView = new SectionView(client);
		
	//create home view container
	var homeContainerWindow = Ti.UI.createWindow({
		title:'OpenPlatform Browser'
	});
	homeContainerWindow.add(homeView);
	
	//create section view container
	var sectionContainerWindow = Ti.UI.createWindow({
		title:'Section'
	});
	sectionContainerWindow.add(sectionView);
	
	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:homeContainerWindow
	});
	self.add(navGroup);
	
	//add behavior for master view
	homeView.addEventListener('sectionSelected', function(event) {
		sectionView.fireEvent('sectionSelected', event);
		navGroup.open(sectionContainerWindow);
	});
	
	return self;
};

module.exports = ApplicationWindow;
