/*:
 * @plugindesc 把「圖片 Pictures」顯示在事件(角色)之下、地圖之上
 * @author ChatGPT
 */
(function() {
  const _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
  Spriteset_Base.prototype.createPictures = function() {
    _Spriteset_Base_createPictures.call(this);
    // 僅在地圖場景有 _tilemap 時調整（戰鬥/標題場景不動）
    if (this._tilemap && this._pictureContainer && this._characterSprites) {
      // 先從原父層移除
      if (this._pictureContainer.parent) {
        this._pictureContainer.parent.removeChild(this._pictureContainer);
      }
      // 找到第一個角色精靈的索引，把圖片插到它的「前面」= 畫在它「下面」
      const firstChar = this._characterSprites[0];
      const idx = Math.max(0, this._tilemap.children.indexOf(firstChar));
      this._tilemap.addChildAt(this._pictureContainer, idx);
    }
  };
})();
