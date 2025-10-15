/*:
 * @plugindesc 讓「與人物相同」(事件/玩家) 顯示在圖片上方；圖片仍在地圖之上
 * @author You
 */
(function() {
  const _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
  Spriteset_Base.prototype.createPictures = function() {
    _Spriteset_Base_createPictures.call(this);

    if (this._tilemap && this._pictureContainer) {
      // 1) 從原父層移除
      if (this._pictureContainer.parent) {
        this._pictureContainer.parent.removeChild(this._pictureContainer);
      }

      // 2) 設定圖片容器 z 比「與人物相同」低
      //   （常見值：tiles 0/1, same=3, above=4）
      this._pictureContainer.z = 2;

      // 3) 插回 tilemap，放在第一個角色精靈之前（確保在角色群之下）
      const firstChar = this._characterSprites && this._characterSprites[0];
      if (firstChar) {
        const idx = Math.max(0, this._tilemap.children.indexOf(firstChar));
        this._tilemap.addChildAt(this._pictureContainer, idx);
      } else {
        this._tilemap.addChild(this._pictureContainer);
      }

      // 4) 立刻做一次排序，避免當幀排序尚未觸發造成視覺延遲
      if (this._tilemap.children && this._tilemap.children.sort && this._compareChildOrder) {
        this._tilemap.children.sort(this._compareChildOrder.bind(this));
      }
    }
  };
})();
