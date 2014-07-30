(function(){
    var menu = document.querySelector('button[name="menu"]');

    menu.addEventListener('click', function(){
        document.querySelector('ui-layout').toggleDrawer();
    });
}());
