from flask import jsonify
from app import app, init
from model.rectangle import Rectangle

rectangles = init()

@app.route('/api/<x1>/<y1>/<x2>/<y2>/<label>')
def add_rectagle(x1, y1, x2, y2, label):
    x1 = float(x1)
    y1 = float(y1)
    x2 = float(x2)
    y2 = float(y2)

    rect = Rectangle(
        (x1, y1),
        (x2, y2),
        {label: 1}
    )

    if len(rectangles) > 0:
        closest = min(rectangles, key=rect.distance)
        dist    = rect.distance(closest)
    else:
        dist = float('inf')

    if dist > 0.0005:  # TODO: tune this value
        rectangles.append(rect)
    else:
        closest.labels[label] += 1

    return jsonify()

@app.route('/api/all')
def get_all_rectangles():
    rects = [r.to_dict() for r in rectangles]
    return jsonify(rectangles=rects)
