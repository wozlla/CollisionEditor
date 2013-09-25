window.navmesh = {};

(function($) {
    var Line = $.Line = function(pointA, pointB) {
        this.pointA = pointA.clone();
        this.pointB = pointB.clone();
        this.normal = null;
    };
    Line.COLLINEAR = 0;
    Line.LINES_INTERSECT = 1;
    Line.SEGMENTS_INTERSECT = 2;
    Line.A_BISECTS_B = 3;
    Line.B_BISECTS_A = 4;
    Line.PARALELL = 5;
    Line.prototype = {
        getPointA: function() {
            return this.pointA;
        },
        getPointB: function() {
            return this.pointB;
        },
        setPointB: function(p) {
            this.pointB = p;
            this.normal = null;
        },
        setPointA: function(p) {
            this.pointA = p;
            this.normal = null;
        },
        getNormal: function() {
            if (!this.normal) {
                this.computeNormal();
            }
            return this.normal;
        },
        signedDistance: function(point) {
            var normal = this.getNormal();
            var v2 = point.subtract(this.pointA);
            return (new $.Vector2f(v2.x, v2.y)).dot(normal);
        },
        classifyPoint: function(point, epsilon) {
            epsilon = epsilon || 1e-6;
            var ret = $.Vector2f.ON_LINE;
            var distance = this.signedDistance(point);
            if (distance > epsilon) {
                ret = $.Vector2f.RIGHT_SIDE;
            } else if (distance < -epsilon) {
                ret = $.Vector2f.LEFT_SIDE;
            }
            return ret;
        },
        intersection: function(other, pIntersectPoint) {
            var denom = (other.pointB.y - other.pointA.y) * (this.pointB.x - this.pointA.x) - (other.pointB.x - other.pointA.x) * (this.pointB.y - this.pointA.y);
            var u0 = (other.pointB.x - other.pointA.x) * (this.pointA.y - other.pointA.y) - (other.pointB.y - other.pointA.y) * (this.pointA.x - other.pointA.x);
            var u1 = (other.pointA.x - this.pointA.x) * (this.pointB.y - this.pointA.y) - (other.pointA.y - this.pointA.y) * (this.pointB.x - this.pointA.x);
            if (denom == 0) {
                if (u0 == 0 && u1 == 0) return Line.COLLINEAR; else return Line.PARALELL;
            } else {
                u0 = u0 / denom;
                u1 = u1 / denom;
                var x = this.pointA.x + u0 * (this.pointB.x - this.pointA.x);
                var y = this.pointA.y + u0 * (this.pointB.y - this.pointA.y);
                if (pIntersectPoint != null) {
                    pIntersectPoint.x = x;
                    pIntersectPoint.y = y;
                }
                if (u0 >= 0 && u0 <= 1 && u1 >= 0 && u1 <= 1) {
                    return Line.SEGMENTS_INTERSECT;
                } else if (u1 >= 0 && u1 <= 1) {
                    return Line.A_BISECTS_B;
                } else if (u0 >= 0 && u0 <= 1) {
                    return Line.B_BISECTS_A;
                }
                return Line.LINES_INTERSECT;
            }
        },
        length: function() {
            var dx = this.pointB.x - this.pointA.x;
            var dy = this.pointB.y - this.pointA.y;
            return Math.sqrt(dx * dx, dy * dy);
        },
        getDirection: function() {
            var pt = this.pointB.subtract(this.pointA);
            return (new $.Vector2f(pt.x, pt.y)).normalize();
        },
        computeNormal: function() {
            var normal = this.getDirection();
            var oldY = normal.y;
            normal.y = normal.x;
            normal.x = -oldY;
            this.normal = normal;
        },
        equals: function(line) {
            return this.pointA.equals(line.pointA) && this.pointB.equals(line.pointB) || this.pointA.equals(line.pointB) && this.pointB.equals(line.pointA);
        },
        clone: function() {
            return new Line(this.pointA, this.pointB);
        }
    };
})(window.navmesh);;


(function($) {
    var Rectangle = $.Rectangle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    Rectangle.prototype = {
        contains: function(x, y) {
            return this.x <= x && x <= this.x + this.width && this.y <= y && y <= this.y + this.height;
        },
        intersection: function(r) {
            return this.x < r.x + r.width && r.x < this.x + this.width && this.y < r.y + r.height && r.y < this.y + this.height;
        }
    };
})(window.navmesh);;


(function($) {
    var Triangle = $.Triangle = function(p1, p2, p3) {
        this.pointA = p1.clone();
        this.pointB = p2.clone();
        this.pointC = p3.clone();
        this.center = null;
        this.sides = null;
        this.dataCalculated = false;
    };
    var EPSILON = Triangle.EPSILON = 1e-6;
    var SIDE_AB = Triangle.SIDE_AB = 0;
    var SIDE_BC = Triangle.SIDE_BC = 1;
    var SIDE_CA = Triangle.SIDE_CA = 2;
    Triangle.prototype = {
        setPoints: function(p1, p2, p3) {
            this.pointA = p1.clone();
            this.pointB = p2.clone();
            this.pointC = p3.clone();
            this.center = null;
            this.sides = null;
            this.dataCalculated = false;
        },
        calculateData: function() {
            var center = this.center;
            var pointA = this.pointA;
            var pointB = this.pointB;
            var pointC = this.pointC;
            if (center == null) center = this.center = pointA.clone(); else center.setVector2f(pointA);
            center.addLocal(pointB).addLocal(pointC).multLocal(1 / 3);
            if (this.sides == null) {
                this.sides = [];
            }
            this.sides[SIDE_AB] = new $.Line(pointA, pointB);
            this.sides[SIDE_BC] = new $.Line(pointB, pointC);
            this.sides[SIDE_CA] = new $.Line(pointC, pointA);
            this.dataCalculated = true;
        },
        getVertex: function(i) {
            switch (i) {
              case 0:
                return this.pointA;
              case 1:
                return this.pointB;
              case 2:
                return this.pointC;
              default:
                return null;
            }
        },
        setVertex: function(i, point) {
            switch (i) {
              case 0:
                this.pointA = point.clone();
                break;
              case 1:
                this.pointB = point.clone();
                break;
              case 2:
                this.pointC = point.clone();
                break;
            }
            this.dataCalculated = false;
        },
        getSide: function(sideIndex) {
            if (this.dataCalculated == false) {
                this.calculateData();
            }
            return this.sides[sideIndex];
        },
        isPointIn: function(testPoint) {
            if (this.dataCalculated == false) {
                this.calculateData();
            }
            var interiorCount = 0;
            for (var i = 0; i < 3; i++) {
                if (this.sides[i].classifyPoint(testPoint, EPSILON) != $.Vector2f.LEFT_SIDE) {
                    interiorCount++;
                }
            }
            return interiorCount == 3;
        },
        clone: function() {
            return new Triangle(this.pointA.clone(), this.pointB.clone(), this.pointC.clone());
        }
    };
})(window.navmesh);;


(function($) {
    var Vector2f = $.Vector2f = function(x, y) {
        this.x = x;
        this.y = y;
    };
    Vector2f.ON_LINE = 0;
    Vector2f.LEFT_SIDE = 1;
    Vector2f.RIGHT_SIDE = 2;
    Vector2f.prototype = {
        setVector2f: function(v) {
            this.x = v.x;
            this.y = v.y;
        },
        getAngle: function() {
            return -Math.atan2(this.y, this.x);
        },
        length: function() {
            return Math.sqrt(this.lengthSquared());
        },
        lengthSquared: function() {
            return this.x * this.x + this.y * this.y;
        },
        distanceSquared: function(v) {
            var dx = x - v.x;
            var dy = y - v.y;
            return dx * dx + dy * dy;
        },
        negate: function() {
            return new Vector2f(-this.x, -this.y);
        },
        negateLocal: function() {
            this.x = -this.x;
            this.y = -this.y;
            return this;
        },
        add: function(v) {
            if (!v) return null;
            return new Vector2f(this.x + v.x, this.y + v.y);
        },
        addLocal: function(v) {
            if (!v) return null;
            this.x += v.x;
            this.y += v.y;
            return this;
        },
        subtract: function(v) {
            if (!v) return null;
            return new Vector2f(this.x - v.x, this.y - v.y);
        },
        subtractLocal: function(v) {
            if (!v) return null;
            this.x -= v.x;
            this.y -= v.y;
            return this;
        },
        dot: function(v) {
            if (!v) return 0;
            return this.x * v.x + this.y * v.y;
        },
        mult: function(v) {
            return new Vector2f(this.x * v.x, this.y * v.y);
        },
        multLocal: function(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        },
        multLocalV: function(v) {
            this.x *= v.x;
            this.y *= v.y;
            return this;
        },
        multV: function(v, product) {
            product = product || new Vector2f;
            product.x = this.x * v.x;
            product.y = this.y * v.y;
            return product;
        },
        divide: function(scalar) {
            return new Vector2f(this.x / scalar, this.y / scalar);
        },
        divideLocal: function(scalar) {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        },
        normalize: function() {
            var len = this.length() || 1;
            return this.divide(len);
        },
        normalizeLocal: function() {
            var len = this.length() || 1;
            return this.divideLocal(len);
        },
        smallestAngleBetween: function(v) {
            return Math.acos(this.dot(v));
        },
        angleBetween: function(v) {
            return Math.atan2(v.y, v.x) - Math.atan2(this.y, this.x);
        },
        interpolate: function(finalV, changeAmnt) {
            this.x = (1 - changeAmnt) * this.x + changeAmnt * finalV.x;
            this.y = (1 - changeAmnt) * this.y + changeAmnt * finalV.y;
        },
        zero: function() {
            this.x = this.y = 0;
        },
        toArray: function() {
            return [ this.x, this.y ];
        },
        rotateAroundOrigin: function(angle, cw) {
            if (cw) angle = -angle;
            var x = Math.cos(angle) * this.x - Math.sin(angle) * this.y;
            var y = Math.sin(angle) * this.x + Math.cos(angle) * this.y;
            this.x = x;
            this.y = y;
        },
        equals: function(v, epsilon) {
            epsilon = epsilon || 1e-6;
            return Math.abs(this.x - v.x) < epsilon && Math.abs(this.y - v.y) < epsilon;
        },
        clone: function() {
            return new Vector2f(this.x, this.y);
        },
        toPoint: function() {
            return {
                x: this.x,
                y: this.y
            };
        }
    };
})(window.navmesh);;


(function($) {
    var Polygon = $.Polygon = function(vertexNum, vertexV) {
        this.vertexV = vertexV;
        this.vertexNum = vertexNum;
        this.rect = null;
    };
    Polygon.prototype = {
        isSimplicity: function() {
            var i, j, itsPt, testLine;
            var vertexV = this.vertexV;
            var edges = [];
            var len = vertexV.length - 1;
            for (i = 0; i < len; i++) {
                edges.push(new $.Line(vertexV[i], vertexV[i + 1]));
            }
            edges.push(new $.Line(vertexV[len], vertexV[0]));
            itsPt = new $.Vector2f;
            len = edges.length;
            for (i = 0; i < len; i++) {
                testLine = edges[i];
                for (j = 0; j < edges.length; j++) {
                    if (!testLine.equals(edges[j])) {
                        if (testLine.intersection(edges[j], itsPt) == $.Line.SEGMENTS_INTERSECT) {
                            if (itsPt.equals(testLine.pointA) || itsPt.equals(testLine.pointB) || itsPt.equals(edges[j].pointA) || itsPt.equals(edges[j].pointB)) {} else {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        },
        cw: function() {
            if (this.isCW() == false) {
                this.vertexV.reverse();
            }
        },
        isCW: function() {
            var vertexV = this.vertexV;
            if (vertexV == null || vertexV.length < 0) return false;
            var topPt = this.vertexV[0];
            var topPtId = 0;
            for (var i = 1; i < vertexV.length; i++) {
                if (topPt.y > vertexV[i].y) {
                    topPt = vertexV[i];
                    topPtId = i;
                } else if (topPt.y == vertexV[i].y) {
                    if (topPt.x > vertexV[i].x) {
                        topPt = vertexV[i];
                        topPtId = i;
                    }
                }
            }
            var lastId = topPtId - 1 >= 0 ? topPtId - 1 : vertexV.length - 1;
            var nextId = topPtId + 1 >= vertexV.length ? 0 : topPtId + 1;
            var last = vertexV[lastId];
            var next = vertexV[nextId];
            var r = this.multiply(last, next, topPt);
            if (r < 0) {
                return true;
            }
            return false;
        },
        multiply: function(sp, ep, op) {
            return (sp.x - op.x) * (ep.y - op.y) - (ep.x - op.x) * (sp.y - op.y);
        },
        rectangle: function() {
            var vertexV = this.vertexV;
            if (vertexV == null || vertexV.length < 0) return null;
            if (this.rect != null) return this.rect;
            var lx = vertexV[0].x;
            var rx = vertexV[0].x;
            var ty = vertexV[0].y;
            var by = vertexV[0].y;
            var v;
            for (var i = 1; i < vertexV.length; i++) {
                v = vertexV[i];
                if (v.x < lx) {
                    lx = v.x;
                }
                if (v.x > rx) {
                    rx = v.x;
                }
                if (v.y < ty) {
                    ty = v.y;
                }
                if (v.y > by) {
                    by = v.y;
                }
            }
            this.rect = new $.Rectangle(lx, rx - lx, ty, by - ty);
            return this.rect;
        },
        union: function(polygon) {
            if (this.rectangle().intersection(polygon.rectangle()) == false) {
                return null;
            }
            var cv0 = [];
            var cv1 = [];
            var node;
            for (var i = 0; i < this.vertexV.length; i++) {
                node = new Node(this.vertexV[i], false, true);
                if (i > 0) {
                    cv0[i - 1].next = node;
                }
                cv0.push(node);
            }
            for (var j = 0; j < polygon.vertexV.length; j++) {
                node = new Node(polygon.vertexV[j], false, false);
                if (j > 0) {
                    cv1[j - 1].next = node;
                }
                cv1.push(node);
            }
            var insCnt = this.intersectPoint(cv0, cv1);
            if (insCnt > 0) {
                return this.linkToPolygon(cv0, cv1);
            } else {
                return null;
            }
        },
        linkToPolygon: function(cv0, cv1) {
            var rtV = [];
            var testNode;
            for (var x = 0; x < cv0.length; x++) {
                testNode = cv0[x];
                if (testNode.i == true && testNode.p == false) {
                    var rcNodes = [];
                    while (testNode != null) {
                        testNode.p = true;
                        if (testNode.i == true) {
                            testNode.other.p = true;
                            if (testNode.o == false) {
                                if (testNode.isMain == true) {
                                    testNode = testNode.other;
                                }
                            } else {
                                if (testNode.isMain == false) {
                                    testNode = testNode.other;
                                }
                            }
                        }
                        rcNodes.push(testNode.v);
                        if (testNode.next == null) {
                            if (testNode.isMain) {
                                testNode = cv0[0];
                            } else {
                                testNode = cv1[0];
                            }
                        } else {
                            testNode = testNode.next;
                        }
                        if (testNode.v.equals(rcNodes[0])) break;
                    }
                    rtV.push(new Polygon(rcNodes.length, rcNodes));
                }
            }
            return rtV;
        },
        intersectPoint: function(cv0, cv1) {
            var insCnt = 0;
            var findEnd = false;
            var startNode0 = cv0[0];
            var startNode1;
            var line0;
            var line1;
            var ins;
            var hasIns;
            var result;
            while (startNode0 != null) {
                if (startNode0.next == null) {
                    line0 = new $.Line(startNode0.v, cv0[0].v);
                } else {
                    line0 = new $.Line(startNode0.v, startNode0.next.v);
                }
                startNode1 = cv1[0];
                hasIns = false;
                while (startNode1 != null) {
                    if (startNode1.next == null) {
                        line1 = new $.Line(startNode1.v, cv1[0].v);
                    } else {
                        line1 = new $.Line(startNode1.v, startNode1.next.v);
                    }
                    ins = new $.Vector2f;
                    if (line0.intersection(line1, ins) == $.Line.SEGMENTS_INTERSECT) {
                        if (this.getNodeIndex(cv0, ins) == -1) {
                            insCnt++;
                            var node0 = new Node(ins, true, true);
                            var node1 = new Node(ins, true, false);
                            cv0.push(node0);
                            cv1.push(node1);
                            node0.other = node1;
                            node1.other = node0;
                            node0.next = startNode0.next;
                            startNode0.next = node0;
                            node1.next = startNode1.next;
                            startNode1.next = node1;
                            if (line0.classifyPoint(line1.pointB) == $.Vector2f.RIGHT_SIDE) {
                                node0.o = true;
                                node1.o = true;
                            }
                            hasIns = true;
                            break;
                        }
                    }
                    startNode1 = startNode1.next;
                }
                if (hasIns == false) {
                    startNode0 = startNode0.next;
                }
            }
            return insCnt;
        },
        getNodeIndex: function(cv, node) {
            for (var i = 0; i < cv.length; i++) {
                if (cv[i].v.equals(node)) {
                    return i;
                }
            }
            return -1;
        }
    };
    var Node = $.Node = function(pt, isInters, main) {
        this.v = pt;
        this.i = isInters;
        this.p = false;
        this.o = false;
        this.other = null;
        this.isMain = main;
        this.next = null;
    };
})(window.navmesh);;


(function($) {
    var EPSILON = 1e-6;
    var Delaunay = $.Delaunay = function() {
        this.polygonV = null;
        this.vertexV = null;
        this.edgeV = null;
        this.outEdgeVecNum = null;
        this.lineV = null;
        this.triangleV = null;
    };
    Delaunay.prototype = {
        createDelaunay: function(polyV) {
            this.initData(polyV);
            var initEdge = this.getInitOutEdge();
            this.lineV.push(initEdge);
            var edge;
            do {
                edge = this.lineV.pop();
                var p3 = this.findDT(edge);
                if (p3 == null) continue;
                var line13 = new $.Line(edge.getPointA(), p3);
                var line32 = new $.Line(p3, edge.getPointB());
                var trg = new $.Triangle(edge.getPointA(), edge.getPointB(), p3);
                this.triangleV.push(trg);
                var index;
                if (this.indexOfVector(line13, this.edgeV) < 0) {
                    index = this.indexOfVector(line13, this.lineV);
                    if (index > -1) {
                        this.lineV.splice(index, 1);
                    } else {
                        this.lineV.push(line13);
                    }
                }
                if (this.indexOfVector(line32, this.edgeV) < 0) {
                    index = this.indexOfVector(line32, this.lineV);
                    if (index > -1) {
                        this.lineV.splice(index, 1);
                    } else {
                        this.lineV.push(line32);
                    }
                }
            } while (this.lineV.length > 0);
            return this.triangleV;
        },
        initData: function(polyV) {
            this.vertexV = [];
            this.edgeV = [];
            var poly, i, len = polyV.length;
            for (i = 0; i < len; i++) {
                poly = polyV[i];
                this.putVertex(this.vertexV, poly.vertexV);
                this.putEdge(this.edgeV, poly.vertexV);
            }
            this.outEdgeVecNum = polyV[0].vertexNum;
            this.lineV = [];
            this.triangleV = [];
        },
        getInitOutEdge: function() {
            var edgeV = this.edgeV;
            var initEdge = edgeV[0];
            var testV;
            var loopSign;
            var loopIdx = 0;
            do {
                loopSign = false;
                loopIdx++;
                for (var j = 0; j < this.vertexV.length; j++) {
                    testV = this.vertexV[j];
                    if (testV.equals(initEdge.pointA) || testV.equals(initEdge.pointB)) continue;
                    if (initEdge.classifyPoint(testV, EPSILON) == $.Vector2f.ON_LINE) {
                        loopSign = true;
                        initEdge = edgeV[loopIdx];
                        break;
                    }
                }
            } while (loopSign && loopIdx < this.outEdgeVecNum - 1);
            return initEdge;
        },
        putVertex: function(dstV, srcV) {
            for (var i = 0; i < srcV.length; i++) {
                dstV.push(srcV[i]);
            }
        },
        putEdge: function(dstV, srcV) {
            if (srcV.length < 3) return;
            var p1 = srcV[0];
            var p2;
            for (var i = 1; i < srcV.length; i++) {
                p2 = srcV[i];
                dstV.push(new $.Line(p1, p2));
                p1 = p2;
            }
            p2 = srcV[0];
            dstV.push(new $.Line(p1, p2));
        },
        indexOfVector: function(line, vector) {
            var lt;
            for (var i = 0; i < vector.length; i++) {
                lt = vector[i];
                if (lt.equals(line)) return i;
            }
            return -1;
        },
        findDT: function(line) {
            var p1 = line.getPointA();
            var p2 = line.getPointB();
            var allVPoint = [];
            for (var i = 0; i < this.vertexV.length; i++) {
                var vt = this.vertexV[i];
                if (this.isVisiblePointOfLine(vt, line)) {
                    allVPoint.push(vt);
                }
            }
            if (allVPoint.length == 0) return null;
            var p3 = allVPoint[0];
            var loopSign = false;
            do {
                loopSign = false;
                var circle = this.circumCircle(p1, p2, p3);
                var boundsBox = this.circleBounds(circle);
                var angle132 = Math.abs(this.lineAngle(p1, p3, p2));
                for (var j = 0; j < allVPoint.length; j++) {
                    var vec = allVPoint[j];
                    if (vec.equals(p1) || vec.equals(p2) || vec.equals(p3)) {
                        continue;
                    }
                    if (boundsBox.contains(vec.x, vec.y) == false) {
                        continue;
                    }
                    var a1 = Math.abs(this.lineAngle(p1, vec, p2));
                    if (a1 > angle132) {
                        p3 = vec;
                        loopSign = true;
                        break;
                    }
                }
            } while (loopSign);
            return p3;
        },
        lineAngle: function(s, o, e) {
            var cosfi, fi, norm;
            var dsx = s.x - o.x;
            var dsy = s.y - o.y;
            var dex = e.x - o.x;
            var dey = e.y - o.y;
            cosfi = dsx * dex + dsy * dey;
            norm = (dsx * dsx + dsy * dsy) * (dex * dex + dey * dey);
            cosfi /= Math.sqrt(norm);
            if (cosfi >= 1) return 0;
            if (cosfi <= -1) return -Math.PI;
            fi = Math.acos(cosfi);
            if (dsx * dey - dsy * dex > 0) return fi;
            return -fi;
        },
        circleBounds: function(c) {
            return new $.Rectangle(c.center.x - c.r, c.center.y - c.r, c.r * 2, c.r * 2);
        },
        circumCircle: function(p1, p2, p3) {
            var m1, m2, mx1, mx2, my1, my2;
            var dx, dy, rsqr, drsqr;
            var xc, yc, r;
            if (Math.abs(p1.y - p2.y) < EPSILON && Math.abs(p2.y - p3.y) < EPSILON) {
                return null;
            }
            m1 = -(p2.x - p1.x) / (p2.y - p1.y);
            m2 = -(p3.x - p2.x) / (p3.y - p2.y);
            mx1 = (p1.x + p2.x) / 2;
            mx2 = (p2.x + p3.x) / 2;
            my1 = (p1.y + p2.y) / 2;
            my2 = (p2.y + p3.y) / 2;
            if (Math.abs(p2.y - p1.y) < EPSILON) {
                xc = (p2.x + p1.x) / 2;
                yc = m2 * (xc - mx2) + my2;
            } else if (Math.abs(p3.y - p2.y) < EPSILON) {
                xc = (p3.x + p2.x) / 2;
                yc = m1 * (xc - mx1) + my1;
            } else {
                xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
                yc = m1 * (xc - mx1) + my1;
            }
            dx = p2.x - xc;
            dy = p2.y - yc;
            rsqr = dx * dx + dy * dy;
            r = Math.sqrt(rsqr);
            return new Circle(new $.Vector2f(xc, yc), r);
        },
        isVisiblePointOfLine: function(vec, line) {
            if (vec.equals(line.pointA) || vec.equals(line.pointB)) {
                return false;
            }
            if (line.classifyPoint(vec, EPSILON) != $.Vector2f.RIGHT_SIDE) {
                return false;
            }
            if (this.isVisibleIn2Point(line.pointA, vec) == false) {
                return false;
            }
            if (this.isVisibleIn2Point(line.pointB, vec) == false) {
                return false;
            }
            return true;
        },
        isVisibleIn2Point: function(pa, pb) {
            var linepapb = new $.Line(pa, pb);
            var interscetVector = new $.Vector2f;
            for (var i = 0; i < this.edgeV.length; i++) {
                var lineTmp = this.edgeV[i];
                if (linepapb.intersection(lineTmp, interscetVector) == $.Line.SEGMENTS_INTERSECT) {
                    if (!pa.equals(interscetVector) && !pb.equals(interscetVector)) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
    var Circle = function(cen, r) {
        this.center = cen;
        this.r = r;
    };
})(window.navmesh);;


(function($) {
    var Heap = $.Heap = function(size, compare) {
        this._size = size;
        this._heap = new Array(size);
        this._count = 0;
        this.compare = compare || function(a, b) {
            return a - b;
        };
    };
    Heap.prototype = {
        peek: function() {
            return this._heap[1];
        },
        maxSize: function() {
            return this._size;
        },
        put: function(obj) {
            var _compare = this.compare;
            if (this._count + 1 < this._size) {
                this._heap[++this._count] = obj;
                var i = this._count;
                var parent = i >> 1;
                var tmp = this._heap[i];
                var v;
                if (_compare != null) {
                    while (parent > 0) {
                        v = this._heap[parent];
                        if (_compare(tmp, v) > 0) {
                            this._heap[i] = v;
                            i = parent;
                            parent >>= 1;
                        } else break;
                    }
                } else {
                    while (parent > 0) {
                        v = this._heap[parent];
                        if (tmp - v > 0) {
                            this._heap[i] = v;
                            i = parent;
                            parent >>= 1;
                        } else break;
                    }
                }
                this._heap[i] = tmp;
                return true;
            }
            return false;
        },
        pop: function() {
            var _compare = this.compare;
            if (this._count >= 1) {
                var o = this._heap[1];
                this._heap[1] = this._heap[this._count];
                delete this._heap[this._count];
                var i = 1;
                var child = i << 1;
                var tmp = this._heap[i];
                var v;
                if (_compare != null) {
                    while (child < this._count) {
                        if (child < this._count - 1) {
                            if (_compare(this._heap[child], this._heap[parseInt(child + 1)]) < 0) child++;
                        }
                        v = this._heap[child];
                        if (_compare(tmp, v) < 0) {
                            this._heap[i] = v;
                            i = child;
                            child <<= 1;
                        } else break;
                    }
                } else {
                    while (child < this._count) {
                        if (child < this._count - 1) {
                            if (this._heap[child] - this._heap[parseInt(child + 1)] < 0) child++;
                        }
                        v = this._heap[child];
                        if (tmp - v < 0) {
                            this._heap[i] = v;
                            i = child;
                            child <<= 1;
                        } else break;
                    }
                }
                this._heap[i] = tmp;
                this._count--;
                return o;
            }
            return null;
        },
        contains: function(obj) {
            for (var i = 1; i <= this._count; i++) {
                if (this._heap[i] === obj) return true;
            }
            return false;
        },
        clear: function() {
            this._heap = new Array(this._size);
            this._count = 0;
        },
        getIterator: function() {
            return new HeapIterator(this);
        },
        isEmpty: function() {
            return false;
        },
        toArray: function() {
            return this._heap.slice(1, this._count - 1);
        },
        dump: function() {
            var s = "Heap\n{\n";
            var k = this._count + 1;
            for (var i = 1; i < k; i++) s += "	" + this._heap[i] + "\n";
            s += "\n}";
            return s;
        }
    };
    var HeapIterator = function(heap) {
        this._values = heap.toArray();
        this._length = this._values.length;
        this._cursor = 0;
    };
    HeapIterator.prototype = {
        getData: function() {
            return this._values[this._cursor];
        },
        setData: function(data) {
            this._values[this._cursor] = data;
        },
        start: function() {
            this._cursor = 0;
        },
        hasNext: function() {
            return this._cursor < this._length;
        },
        next: function() {
            return this._values[this._cursor++];
        }
    };
})(window.navmesh);;


(function($) {
    var SIDE_AB = $.Triangle.SIDE_AB = 0;
    var SIDE_BC = $.Triangle.SIDE_BC = 1;
    var SIDE_CA = $.Triangle.SIDE_CA = 2;
    var Cell = $.Cell = function(p1, p2, p3) {
        $.Triangle.apply(this, arguments);
        this.links = null;
        this.index = null;
        this.sessionId = null;
        this.f = null;
        this.h = null;
        this.isOpen = false;
        this.parent = null;
        this.m_ArrivalWall = null;
        this.m_WallMidpoint = null;
        this.m_WallDistance = null;
        this.init();
    };
    Cell.prototype = Object.create($.Triangle.prototype);
    Cell.prototype.reset = function() {
        this.sessionId = null;
        this.f = null;
        this.h = null;
        this.isOpen = false;
        this.parent = null;
        this.m_ArrivalWall = null;
    };
    Cell.prototype.init = function() {
        this.links = [ -1, -1, -1 ];
        this.calculateData();
        this.m_WallMidpoint = [];
        this.m_WallDistance = [];
        this.m_WallMidpoint[0] = new $.Vector2f((this.pointA.x + this.pointB.x) / 2, (this.pointA.y + this.pointB.y) / 2);
        this.m_WallMidpoint[1] = new $.Vector2f((this.pointC.x + this.pointB.x) / 2, (this.pointC.y + this.pointB.y) / 2);
        this.m_WallMidpoint[2] = new $.Vector2f((this.pointC.x + this.pointA.x) / 2, (this.pointC.y + this.pointA.y) / 2);
        var wallVector;
        wallVector = this.m_WallMidpoint[0].subtract(this.m_WallMidpoint[1]);
        this.m_WallDistance[0] = wallVector.length();
        wallVector = this.m_WallMidpoint[1].subtract(this.m_WallMidpoint[2]);
        this.m_WallDistance[1] = wallVector.length();
        wallVector = this.m_WallMidpoint[2].subtract(this.m_WallMidpoint[0]);
        this.m_WallDistance[2] = wallVector.length();
    };
    Cell.prototype.requestLink = function(pA, pB, caller) {
        if (this.pointA.equals(pA)) {
            if (this.pointB.equals(pB)) {
                this.links[$.Triangle.SIDE_AB] = caller.index;
                return true;
            } else if (this.pointC.equals(pB)) {
                this.links[$.Triangle.SIDE_CA] = caller.index;
                return true;
            }
        } else if (this.pointB.equals(pA)) {
            if (this.pointA.equals(pB)) {
                this.links[$.Triangle.SIDE_AB] = caller.index;
                return true;
            } else if (this.pointC.equals(pB)) {
                this.links[$.Triangle.SIDE_BC] = caller.index;
                return true;
            }
        } else if (this.pointC.equals(pA)) {
            if (this.pointA.equals(pB)) {
                this.links[$.Triangle.SIDE_CA] = caller.index;
                return true;
            } else if (this.pointB.equals(pB)) {
                this.links[$.Triangle.SIDE_BC] = caller.index;
                return true;
            }
        }
        return false;
    };
    Cell.prototype.getLink = function(side) {
        return this.links[side];
    };
    Cell.prototype.setLink = function(side, caller) {
        this.links[side] = caller.index;
    };
    Cell.prototype.checkAndLink = function(cellB) {
        if (this.getLink(SIDE_AB) == -1 && cellB.requestLink(this.pointA, this.pointB, this)) {
            this.setLink(SIDE_AB, cellB);
        } else if (this.getLink(SIDE_BC) == -1 && cellB.requestLink(this.pointB, this.pointC, this)) {
            this.setLink(SIDE_BC, cellB);
        } else if (this.getLink(SIDE_CA) == -1 && cellB.requestLink(this.pointC, this.pointA, this)) {
            this.setLink(SIDE_CA, cellB);
        }
    };
    Cell.prototype.setAndGetArrivalWall = function(index) {
        if (index == this.links[0]) {
            this.m_ArrivalWall = 0;
            return 0;
        } else if (index == this.links[1]) {
            this.m_ArrivalWall = 1;
            return 1;
        } else if (index == this.links[2]) {
            this.m_ArrivalWall = 2;
            return 2;
        }
        return -1;
    };
    Cell.prototype.computeHeuristic = function(goal) {
        var XDelta = Math.abs(goal.x - this.center.x);
        var YDelta = Math.abs(goal.y - this.center.y);
        this.h = XDelta + YDelta;
    };
})(window.navmesh);;


(function($) {
    $.PathResult = {
        NO_RELATIONSHIP: 0,
        ENDING_CELL: 1,
        EXITING_CELL: 2
    };
})(window.navmesh);;


(function($) {
    var WayPoint = $.WayPoint = function(cell, position) {
        this.cell = cell;
        this.position = position;
    };
})(window.navmesh);;


(function($) {
    var NavMesh = $.NavMesh = function(cellVector) {
        this.m_CellVector = cellVector;
        this.openList = new $.Heap(this.m_CellVector.length, function(a, b) {
            return b.f - a.f;
        });
        this.closeList = [];
    };
    var EPSILON = NavMesh.EPSILON = 1e-6;
    var pathSessionId = NavMesh.pathSessionId = 0;
    NavMesh.prototype = {
        getCell: function(index) {
            return this.m_CellVector[index];
        },
        findClosestCell: function(pt) {
            for (var i = 0; i < this.m_CellVector.length; i++) {
                var pCell = this.m_CellVector[i];
                if (pCell.isPointIn(pt)) {
                    return pCell;
                }
            }
            return null;
        },
        findPath: function(startPointPx, endPointPx) {
            pathSessionId++;
            var startPos = new $.Vector2f(startPointPx.x, startPointPx.y);
            var endPos = new $.Vector2f(endPointPx.x, endPointPx.y);
            var endCell = this.findClosestCell(endPos);
            if(endCell == null) {
                return null;
            }
            var startCell = this.findClosestCell(startPos);
            if (startCell == null) {
                return null;
            }
            var outPath;
            if (startCell == endCell) {
                outPath = [ startPointPx, endPointPx ];
            } else {
                outPath = this.buildPath(startCell, startPos, endCell, endPos);
            }
            return outPath;
        },
        buildPath: function(startCell, startPos, endCell, endPos) {
            var openList = this.openList;
            var closeList = this.closeList;
            openList.clear();
            closeList.length = 0;
            openList.put(endCell);
            endCell.f = 0;
            endCell.h = 0;
            endCell.isOpen = false;
            endCell.parent = null;
            endCell.sessionId = pathSessionId;
            var foundPath = false;
            var currNode;
            var adjacentTmp = null;
            var count = 0;
            while (openList._size > 0) {
                count++;
                if (count > 500) {
                    throw "exception in 1";
                }
                currNode = openList.pop();
                closeList.push(currNode);
                if (currNode == startCell) {
                    foundPath = true;
                    break;
                }
                var adjacentId;
                for (var i = 0; i < 3; i++) {
                    adjacentId = currNode.links[i];
                    if (adjacentId < 0) {
                        continue;
                    } else {
                        adjacentTmp = this.m_CellVector[adjacentId];
                    }
                    if (adjacentTmp != null) {
                        if (adjacentTmp.sessionId != pathSessionId) {
                            adjacentTmp.sessionId = pathSessionId;
                            adjacentTmp.parent = currNode;
                            adjacentTmp.isOpen = true;
                            adjacentTmp.computeHeuristic(startPos);
                            adjacentTmp.f = currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)];
                            openList.put(adjacentTmp);
                            adjacentTmp.setAndGetArrivalWall(currNode.index);
                        } else {
                            if (adjacentTmp.isOpen) {
                                if (currNode.f + adjacentTmp.m_WallDistance[Math.abs(i - currNode.m_ArrivalWall)] < adjacentTmp.f) {
                                    adjacentTmp.f = currNode.f;
                                    adjacentTmp.parent = currNode;
                                    adjacentTmp.setAndGetArrivalWall(currNode.index);
                                }
                            } else {
                                adjacentTmp = null;
                                continue;
                            }
                        }
                    }
                }
            }
            if (foundPath) {
                return this.getPath(startPos, endPos);
            } else {
                return null;
            }
        },
        getCellPath: function() {
            var pth = [];
            var st = this.closeList[this.closeList.length - 1];
            pth.push(st);
            while (st.parent != null) {
                pth.push(st.parent);
                st = st.parent;
            }
            return pth;
        },
        getPath: function(start, end) {
            var cellPath = this.getCellPath();
            if (cellPath == null || cellPath.length == 0) {
                return null;
            }
            var pathArr = [];
            pathArr.push(start.toPoint());
            if (cellPath.length == 1) {
                pathArr.push(end.toPoint());
                return pathArr;
            }
            var wayPoint = new $.WayPoint(cellPath[0], start);
            var count = 0;
            while (!wayPoint.position.equals(end)) {
                count++;
                if (count > 10000) {
                    return null;
                }
                wayPoint = this.getFurthestWayPoint(wayPoint, cellPath, end);
                pathArr.push({
                    x: wayPoint.position.x,
                    y: wayPoint.position.y
                });
            }
            return pathArr;
        },
        getFurthestWayPoint: function(wayPoint, cellPath, end) {
            var startPt = wayPoint.position;
            var cell = wayPoint.cell;
            var lastCell = cell;
            var startIndex = cellPath.indexOf(cell);
            var outSide = cell.sides[cell.m_ArrivalWall];
            var lastPtA = outSide.pointA;
            var lastPtB = outSide.pointB;
            var lastLineA = new $.Line(startPt, lastPtA);
            var lastLineB = new $.Line(startPt, lastPtB);
            var testPtA, testPtB;
            for (var i = startIndex + 1; i < cellPath.length; i++) {
                cell = cellPath[i];
                outSide = cell.sides[cell.m_ArrivalWall];
                if (i == cellPath.length - 1) {
                    testPtA = end;
                    testPtB = end;
                } else {
                    testPtA = outSide.pointA;
                    testPtB = outSide.pointB;
                }
                if (!lastPtA.equals(testPtA)) {
                    if (lastLineB.classifyPoint(testPtA, EPSILON) == $.Vector2f.RIGHT_SIDE) {
                        return new $.WayPoint(lastCell, lastPtB);
                    } else {
                        if (lastLineA.classifyPoint(testPtA, EPSILON) != $.Vector2f.LEFT_SIDE) {
                            lastPtA = testPtA;
                            lastCell = cell;
                            lastLineA.setPointB(lastPtA);
                        }
                    }
                }
                if (!lastPtB.equals(testPtB)) {
                    if (lastLineA.classifyPoint(testPtB, EPSILON) == $.Vector2f.LEFT_SIDE) {
                        return new $.WayPoint(lastCell, lastPtA);
                    } else {
                        if (lastLineB.classifyPoint(testPtB, EPSILON) != $.Vector2f.RIGHT_SIDE) {
                            lastPtB = testPtB;
                            lastCell = cell;
                            lastLineB.setPointB(lastPtB);
                        }
                    }
                }
            }
            return new $.WayPoint(cellPath[cellPath.length - 1], end);
        }
    };
})(window.navmesh);;
