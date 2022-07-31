import { Vector } from "./Vector.js";
export class GraphCalculator {
    constructor() {
        this.calculator = null;
        var elt = document.getElementById('calculator');
        // @ts-ignore
        this.calculator = Desmos.GraphingCalculator(elt, { expressions: false });
    }
    static GetGraphBounds(points) {
        var bounds = {
            left: Number.MAX_SAFE_INTEGER,
            right: Number.MIN_SAFE_INTEGER,
            bottom: Number.MAX_SAFE_INTEGER,
            top: Number.MIN_SAFE_INTEGER
        };
        for (var i = 0; i < points.length; i++) {
            bounds.left = Math.min(points[i].x, bounds.left);
            bounds.right = Math.max(points[i].x, bounds.right);
            bounds.bottom = Math.min(points[i].y, bounds.bottom);
            bounds.top = Math.max(points[i].y, bounds.top);
        }
        const scale = 1.5;
        var width = bounds.right - bounds.left;
        var height = bounds.top - bounds.bottom;
        bounds.left -= (width * scale - width) / 2;
        bounds.right += (width * scale - width) / 2;
        bounds.bottom -= (height * scale - height) / 2;
        bounds.top += (height * scale - height) / 2;
        return bounds;
    }
    Update(input, rays, strongholdPos) {
        var expressions = this.calculator.getExpressions();
        this.calculator.removeExpressions(expressions);
        this.calculator.setExpression({ id: 'ray1', latex: 'f(x)=(' + rays[0].slope + ')x +' + rays[0].tangent });
        this.calculator.setExpression({ id: 'ray2', latex: 'g(x)=(' + rays[1].slope + ')x +' + rays[1].tangent });
        this.calculator.setExpression({ id: 'point1', latex: 'A=(' + input.firstPoint.x + ',' + -input.firstPoint.y + ')', label: 'First Throw', showLabel: true });
        this.calculator.setExpression({ id: 'point2', latex: 'B=(' + input.secondPoint.x + ',' + -input.secondPoint.y + ')', label: 'Second Throw', showLabel: true });
        this.calculator.setExpression({ id: 'point3', latex: 'C=(' + strongholdPos.x + ',' + strongholdPos.y + ')', label: 'Stronghold ' + new Vector(strongholdPos.x, -strongholdPos.y), showLabel: true });
        this.calculator.setMathBounds(GraphCalculator.GetGraphBounds([input.firstPoint, input.secondPoint, strongholdPos]));
    }
}