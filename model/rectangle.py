from collections import defaultdict, namedtuple

_point     = namedtuple('Point', ['x', 'y'])
_rectangle = namedtuple('Rectangle', ['point1', 'point2', 'l'])

class Rectangle(_rectangle):
    def __new__(cls, point1, point2, l={}):
        self        = super(Rectangle, cls).__new__(cls, point1, point2, l)
        self.p1     = _point(*point1)
        self.p2     = _point(*point2)
        self.c      = _point(*self._center)
        self.labels = defaultdict(int, l)
        return self

    @property
    def _center(self):
        return (self.p1.x + self.p2.x) / 2, \
               (self.p1.y + self.p2.y) / 2

    def distance(self, r):
        return 0.125 * abs(self.p1.x - r.p1.x) + \
               0.125 * abs(self.p1.y - r.p1.y) + \
               0.125 * abs(self.p2.x - r.p2.x) + \
               0.125 * abs(self.p2.y - r.p2.y) + \
               0.25  * abs(self.c.x  - r.c.x)  + \
               0.25  * abs(self.c.y  - r.c.y)

    def to_dict(self):
        return {
            'point1': self.point1,
            'point2': self.point2,
            'center': self._center,
            'labels': self.labels
        }
