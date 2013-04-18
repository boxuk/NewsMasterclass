/**
 * Item view displays content for a given news item
 */
function ItemView(item) {
    
    var self = Ti.UI.createWebView({
        html: item.fields.body
    });
    
    return self;
}

module.exports = ItemView;
