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
		sectionView = new SectionView();
		
	homeView.borderColor = '#000';
	sectionView.borderWidth = 1;
		
	//create master view container
	var homeContainer = Ti.UI.createView({
		top:0,
		bottom:0,
		left:0,
		width:240
	});
	homeContainer.add(homeView);
	self.add(homeContainer);
	
	//create detail view container
	var sectionContainer = Ti.UI.createView({
		top:0,
		bottom:0,
		right:0,
		left:240
	});
	sectionContainer.add(sectionView);
	self.add(sectionContainer);
	
	//add behavior for master view
	sectionView.addEventListener('sectionSelected', function(e) {
		sectionView.fireEvent('sectionSelected',e);
	});
	
	return self;
};

module.exports = ApplicationWindow;
