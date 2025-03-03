const A = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], W = A.map((n, t) => [t, n]), X = A.map((n, t) => [n, t]), j = new Map(W.concat(X)), s = 16, S = new Promise((n, t) => {
  const o = new Image();
  o.onload = () => n(o), o.onerror = t, o.src = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkAAAAAQCAYAAAD+i8DoAAAAAXNSR0IArs4c6QAABBRJREFUeJztmt2W3SAIhZOuvv8rpzeTtSwjCnujJOfwXbUT+VEB0ZnjKIqiKIqiKIqiKIqiKIqiKIqiKIqP4hx9vK7rOs9zOEaOVw0Z9TA6WPsjeYseVn6mwyI784+xP/OBmb+UlePu7x77nti95Zn1i1j/e1zv56tlP9m+RUfm/nviG9Fh0W/xcXX90/R4c7nVhcgytSTiHJR6Is5Pi55V5y+rZ1X/8MeiNALL4szGWBc4WvYGTUKrfMT8tTERwTnzn/nefkOan5kOK+z6rZK36GBkP8H+cXDxO7Kxa/8Z7vlJW9b8keNnP9Pso99HdpD1Q9ccnb9lXJQehNXnj2V/UR9W9Q9/Z4ORDlo7wDy6RreYLPseouV3FFBp21s45VhEXhKhA7HZmwcq75G7/83GcM//meyT7cvvFtsZsYNynud5/cC84ETR+uGJf/TyIu0g8aPp8tDzl4l9xJ/WB3QeK84vtAmOOkc8WOW3vACxDRSqJ9p+pvz5A6P3bWQeYG3RY+QRtP1H5SPiP9s+oicLufeZlxdvDsmDY9aUrkD64LXLrjcTv+waPaFpj8y/jPl49q/7AiQ7UG8QagH41gJ2HPzvgHfOfWfBXcUTCgFz+0LyJgppd3c8oPbbdet9i/RxBbMbu+f1ImL/2PiVP0Pto3uH5o9sAhFZFuQMjKh5vRxi9k7qRv2yotUA7/lrzZ9tfwP0ZjJfhK4Gxoc3kd38sC8YrUzWvvXiZncTjtjXxnxD/Mu5o4dAZPyi8p+AjOGdL0EM5w/3/73nhzbWm4PIukXatsz71wuQdBq5zWqJjHb0GbBdeKQvN9b164154wGSGS933EffxrLIuMGj9rX4fVP9uH1F976tmais9AXx41thXiB6Mp4zsLfnyEWm1wShshYZFm2O1rXT8m2Uh+oLkLWDsvC25HuSv7Kb/wbaOWc2D7sP/khOAarjOOL/pkJjZOctOaD5meF/5pqxzXNm09b67s0fLYbRi6t3zIrzevdjAGNf1r2Z7H8NkOzApAL2NsOO32U/m7f5exPt9xOaoAi8RWB2A4y2N7KF7AFTN6JzH6H3grLLdrtu2r9HyMbjjTkkm5+MvWdyiPFXO7w9jRi7XhHxz/iA2kdsdv8IuteBRRSxiE56h/0I/1kyC5YWgJb5r2iCvM+3Iz8yb8Uz2jzL8D/avtQ3k233mrWNMJt/RCPr8UX69BZaf6XvozWMXH/pQ8Te7Tq/GEY59Ab/WfteuV+/AtMWiS0+FnlLgVxpf8bqoIiYP7t/oznO5t+zgdjViubMPuKfdYx1HqvkPToYZv57c8B7k19Vf6xE2O9dIFm/LGgXFXTvGB/Q7xHr37MRMXcmfq3fI0DrcLbvrP1s/4uiKIqiKIqiKIqiKIon8g89r0ylPEQWvgAAAABJRU5ErkJggg==", import.meta.url).href;
}), K = await S;
function k() {
  return A[Math.floor(Math.random() * A.length)];
}
function L(n) {
  const t = [];
  for (let o = 0; o < n; o++)
    t.push(k());
  return t.join("");
}
function T(n, t, o, c) {
  const a = j.get(c);
  n.drawImage(K, a * s, 0, s, s, t, o, s, s);
}
function E(n, t, o, c) {
  c.split("").forEach((a, r) => {
    T(n, t, o + r * s, a);
  });
}
function u(n, t, o, c, a) {
  const r = { x: s, y: s * c.length }, f = document.createElement("canvas"), d = f.getContext("2d");
  f.width = r.x, f.height = r.y, d.fillStyle = a, E(d, 0, 0, c), d.globalCompositeOperation = "source-in", d.fillRect(0, 0, r.x, r.y), n.drawImage(f, t, o);
}
function Z(n, t, o, c, a, r) {
  u(n, t, o + 1, c, r), u(n, t, o, c, a);
}
function q(n, t, o, c, a) {
  n.save(), n.fillStyle = a, n.fillRect(t, o, s, s * c.length), n.restore();
}
const B = Object.prototype.toString;
function G(n) {
  return B.call(n) == "[object String]";
}
function U(n) {
  if (!G(n))
    return n;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = n, t.fillRect(0, 0, 1, 1);
  const [o, c, a, r] = t.getImageData(0, 0, 1, 1).data;
  return { r: o, g: c, b: a, a: r };
}
function D(n, t) {
  const o = t.x || 0, c = t.y || 0, a = t.w, r = t.h, f = t.color_main || "lime", d = t.color_secondary || "green", b = t.color_bg || "black", I = t.n_strs, p = t.str_len, x = t.n_passes, O = U(b), R = t.effect_func || ((i, l, y, e) => {
    if (e == x - 1)
      return i;
    const P = l % 2 == 0 ? 0.4 : 0.2;
    return Math.random() > P ? i : O;
  }), z = Math.floor(a / s), M = Math.floor(r / s), m = document.createElement("canvas"), h = m.getContext("2d");
  m.width = a, m.height = r, h.fillStyle = b, h.fillRect(0, 0, a, r);
  const v = [];
  for (let i = 0; i < I; i++)
    v.push({
      x: Math.floor(Math.random() * z) * s,
      y: Math.floor(Math.random() * M) * s,
      text: L(p)
    });
  for (let i = 0; i < x; i++) {
    v.forEach((e) => {
      u(h, e.x, e.y + x - i + 1, e.text, d);
    });
    const l = h.getImageData(0, 0, a, r), y = new Uint8ClampedArray(l.data);
    for (let e = 0; e < a * r; e++) {
      const P = {
        r: l.data[e * 4 + 0],
        g: l.data[e * 4 + 1],
        b: l.data[e * 4 + 2],
        a: l.data[e * 4 + 3]
      }, w = e % a, _ = Math.floor(e / a), g = R(P, w, _, i, e, y);
      l.data[e * 4 + 0] = g.r, l.data[e * 4 + 1] = g.g, l.data[e * 4 + 2] = g.b, l.data[e * 4 + 3] = g.a;
    }
    h.putImageData(l, 0, 0);
  }
  v.forEach((i) => {
    u(h, i.x, i.y, i.text, f);
  }), n.drawImage(m, o, c);
}
export {
  s as char_size,
  q as clearAreaToColor,
  D as draw,
  T as drawChar,
  E as drawStr,
  u as drawStrWithColor,
  Z as drawStrWithUnderStroke,
  L as randStr
};
