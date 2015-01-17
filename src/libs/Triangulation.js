/**
 * 三角化类
 * 将碰撞编辑器导出的path三角化
 */

(function() {

    function Triangulation(path) {
        this.triangleV = null;
        this._build(path);
    }

    Triangulation.COMBINE_ITEM = "combine";

    Triangulation.prototype = {

        _build : function(path) {
            var i, j, len;
            var polyArr = [];
            var poly = [];
            for(i=0, len=path.length; i<len; i++) {
                if(path[i] === Triangulation.COMBINE_ITEM) {
                    polyArr.push(new navmesh.Polygon(poly.length, poly));
                    poly = [];
                } else {
                    poly.push(new navmesh.Vector2f(path[i].x, path[i].y));
                }
            }

            var delaunay = new navmesh.Delaunay();
            this.triangleV = delaunay.createDelaunay(polyArr);
        },

        isPointIn : function(point) {
            var pointIn = false;
            for(var i= 0,len=this.triangleV.length; i<len; i++) {
                if(this.triangleV[i].isPointIn(point)) {
                    pointIn = true;
                    break;
                }
            }
            return pointIn;
        }

    };

    navmesh.Triangulation = Triangulation;

})();