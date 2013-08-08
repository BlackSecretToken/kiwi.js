interface IRenderer {
    render(camera: Kiwi.Camera);

}

module Kiwi.Renderers {

    // Class
    export class CanvasRenderer implements IRenderer {

        constructor(game: Kiwi.Game) {
            this._game = game;
        }

        public boot() {

        }



        private _game: Kiwi.Game;

        private _currentCamera: Kiwi.Camera;

        private _recurse(child: IChild) {

            //console.log(child.childType());

            if (!child.willRender()) return;

            if (child.childType() === Kiwi.GROUP) {
                for (var i = 0; i < (<Kiwi.Group>child).members.length; i++) {
                    this._recurse((<Kiwi.Group>child).members[i]);
                }
            } else {

                var ctx: CanvasRenderingContext2D = this._game.stage.ctx;
                
                if ((<Kiwi.GameObjects.Sprite>child).objType() === "Sprite") {

                    ctx.save();
                    child = <Kiwi.GameObjects.Sprite>child;

                    var m: Kiwi.Geom.Matrix = child.transform.getConcatenatedMatrix();
                    ctx.setTransform(m.a, m.b, m.c, m.d, m.tx, m.ty);
                    ctx.drawImage((<Kiwi.GameObjects.Sprite>child).texture.image, 0, 0, (<Kiwi.GameObjects.Sprite>child).size.width(), (<Kiwi.GameObjects.Sprite>child).size.height());
                    ctx.restore();
                }
            }

        
        }
        

        public render(camera: Kiwi.Camera) {

            this._currentCamera = camera;
            var root: IChild[] = this._game.states.current.members;
            
            //clear 
            this._game.stage.ctx.fillRect(0, 0, this._game.stage.size.width(), this._game.stage.size.height());

            for (var i = 0; i < root.length; i++) {
                this._recurse(root[i]);
            }
            //console.log("reder");

            /*
            
            */
            
        }
        

    }

}

