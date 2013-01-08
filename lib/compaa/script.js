var Compaa = {
  filepath: function() {
    queryString = window.location.search.replace('?', '');
    return queryString.split('=')[1];
  },

  differenceGifPath: function() {
    return this.filepath();
  },

  oldImagePath: function() {
    return this.filepath().replace('gif', 'png').replace('_difference.png', '').replace('differences_in_screenshots_this_run','reference_screenshots');
  },

  newImagePath: function() {
    return this.filepath().replace('gif', 'png').replace('_difference.png', '').replace('differences_in_screenshots_this_run', 'screenshots_generated_this_run');
  },

  initClickHandlers: function() {
    document.getElementById('differenceButton').onclick = function() { Compaa.show('difference') };
    document.getElementById('animationButton').onclick  = function() { Compaa.show('animation') };
    document.getElementById('oldImageButton').onclick   = function() { Compaa.show('oldImage') };
    document.getElementById('newImageButton').onclick   = function() { Compaa.show('newImage') };
  },

  hideAllImages: function() {
    for (var i=0; i < this.imageTypes.length, i++) {
      document.getElementById(this.imageTypes[i]).style.display = 'none';
    }
  },

  show: function(mode) {
    this.hideAllImages();
    document.getElementById(mode).style.display = 'block';
  },

  setFormFilePath: function() {
    document.getElementById('filepath').value = this.newImagePath;
  },

  imageTypes: ['difference', 'animation', 'oldImage', 'newImage'],

  init: function() {
    this.setFormFilePath();

    var oldImg = document.createElement('img');
    oldImg.src = this.oldImagePath();
    
    var newImg = document.createElement('img');
    newImg.src = this.newImagePath();

    document.getElementById('difference').width = oldImg.width;
    document.getElementById('difference').height = oldImg.height;

    document.getElementById('offScreenCanvas').width = newImg.width;
    document.getElementById('offScreenCanvas').height = newImg.height;
    
    var over = document.getElementById('offScreenCanvas').getContext('2d'); 
    over.drawImage(oldImg, 0, 0);

    var under = document.getElementById('difference').getContext('2d');
    under.drawImage(newImg, 0, 0);

    over.blendOnto(under,'difference');

    document.getElementById('oldImage').src = this.oldImagePath();
    document.getElementById('newImage').src = this.newImagePath();

    this.initClickHandlers();
  }
}

document.onreadystatechange = function() {
  if (document.readyState == "complete" || document.readyState == "interactive") {
    Compaa.init();
  }
}