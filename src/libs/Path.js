(function() {

    function Path(collisionPaths) {

        this.dectectDelta = 20;
        this.navMesh = null;

        this._buildTriangleV(collisionPaths);
        this._buildCellV();
        this._buildNavMesh();
    }

    Path.prototype = {
        find : function(from, to, findWalkable) {
            var end = {
                x : to.x,
                y : to.y
            };
            var path = null;
            var count = 0;
            var dir = {
                x : end.x - from.x,
                y : end.y - from.y
            };
            var len = wozllajs.geom.vectorLength(dir);
            if(len <= 20) {
                return null;
            }
            wozllajs.geom.vectorNomalize(dir);
            path = this.navMesh.findPath(from, end);
            to.walkable = true;
            while(!path) {
                count ++;
                if(count > 100) return null;
                path = this.navMesh.findPath(from, end);
                to.walkable = false;
                end.x -= dir.x * this.dectectDelta;
                end.y -= dir.y * this.dectectDelta;
            }
            return path;
        },
        _buildNavMesh : function() {
            this.navMesh = new navmesh.NavMesh(this.cellV);
        },
        _buildTriangleV : function(collisionPaths) {
            var start = Date.now();
            this.triangleV = new navmesh.Triangulation(collisionPaths).triangleV;
            console.log('trangulation: ' + (Date.now() - start));
        },
        _buildCellV : function() {
            var triangleV = this.triangleV;
            var cellV = [];
            var trg;
            var cell;
            var i, j, len, len2;
            for (j=0, len=triangleV.length; j<len; j++) {
                trg = triangleV[j];
                cell = new navmesh.Cell(trg.getVertex(0), trg.getVertex(1), trg.getVertex(2));
                cell.index = j;
                cellV.push(cell);
            }

            for(i= 0, len=cellV.length; i<len; i++) {
                var pCellA = cellV[i];
                for(j= 0, len2=cellV.length; j<len2; j++) {
                    var pCellB = cellV[j];
                    if (pCellA != pCellB) {
                        pCellA.checkAndLink(pCellB);
                    }
                }
            }
            this.cellV = cellV;
        },

        draw : function(context) {
            var triangleV = this.triangleV;
            var i, len, trg;
            context.save();
            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = 'blue';
            for (i=0, len=triangleV.length; i<len; i++) {
                trg = triangleV[i];
                context.moveTo(trg.pointA.x, trg.pointA.y);
                context.lineTo(trg.pointB.x, trg.pointB.y);
                context.lineTo(trg.pointC.x, trg.pointC.y);
                context.lineTo(trg.pointA.x, trg.pointA.y);
            }
            context.stroke();
            context.restore();
        }
    };

    navmesh.Path = Path;

})();