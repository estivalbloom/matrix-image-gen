const u = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], _ = u.map((n, t) => [t, n]), F = u.map((n, t) => [n, t]), C = new Map(_.concat(F)), l = 16, U = new Promise((n, t) => {
  const o = new Image();
  o.onload = () => n(o), o.onerror = t, o.src = new URL("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAkAAAAAQCAYAAAD+i8DoAAAAAXNSR0IArs4c6QAABBRJREFUeJztmtuSJCsIRdOJ+f9fznlpIxxaFDYgmVWsp3M65SIiolPXVRRFURRFURRFURRFURRFURRFURQfRVt9vO/7bq0tx9DxrCGhHosOq/2VvESPVX6nQyK7889if+eDZf5Ulo7r3zX2Nbnb5S3x84h/Hzf7e7TsJ9uX6Mhcf01+Izok+iU+Rtc/To92L4+6EFm0lnicgTNdHvYleqLOX6ueqPj/kSj1QBKc3RhpgL1lO+gmlMp7zJ8b45GcO/8t38dvSPOz0yHFGr8oeYkOi+wn2L8uW/6ubJxafwt9ftSWdP/Q8bu/cfbR7ys7SPzQmKPz9zy/IvIl+vyRrC/qQ1T8/+4GIx00d4BpdK1uMVn2NXjLnyig1La2cNKxiDzFQwdiczYPVF4j1//bmsMz/3eyT7ZPv0tsZ+QOSmut3T9YXnC8GP3Q5D96eaF2kPzhdGlY+XDq/Bpjhs4j4vxCm2Cvc0SDVP7IC5C1gUL1eNvPlG8/WPS+jcwDbCy6FnkEbv1ReY/8z7aP6MmCrn3m5UW7h2aH/uxbJNQHrV2PeFtzWKJzxhOads/9lzEfzdpNX4BoB6pNQi4B31rArsv+G4aTcz9ZcKN4QiGw3L6QfeMFtXs6H1D7Y9xm3zx9jGB3Y9e8XnisnzV/6d9Q++jaofuHNoFe7HwZ44bEz6PmzfaQZe2obtQvKVwN0J6/0v1z7DdAbybzRegesPjwJrKbH4/bX1QRljLLm9NNOGKfG/MN+U/njh4CnvmLyr+Vcd961d3T8Ws/9P/XzoMbq40FUsc9bUvm/esFiDqN3Ga5jYx29BlYu3BPXzrS+M3GvPEAycyXnvfet7EsMm7wqH0uf99UP7qv6NqPNROVpb4gfnwjdN2k8fO6bMzWHNE9a4JQWYmMFW6O0v6B22+rfci+AL25A7byJH9pN/8NjHPObB5OH/yeNAKq47rsP0KU2l/Zecse4PzM8D8zZtbmObtpo3tHswc4v3c60MutxoYEauP0Y4DFPq17O9n/GiDagVEF1tuMdfwp+9m8zd+Ot99PaII80BaB3Q3Q297KluUAQGS99z7C7AXllG2ucdQ2kZY1yIY2P9m+e8RQKssd3pqLjDVeHvnvGSupLsTm9EfQsw7Mo4hpCnNEslkT6OSNJHPTcwkomX9EE6R9vl358eSXhHGfZfgfYV+zfuNYD9tadvP3aGQ1vlCf3sLoL/V9FUPP+FMfTp09HvIWVnvoZAysoPa1cr/+CYwLkrX4SOQlBTLS/o7opPCYv3X9VnPczX9mA7HLFc2dfcQ/6RjpPKLkNTos7PxH9oBGNqr+SPGwP7tAWv2SwF1ULGuH+oB+94j/zEbkK0In8vyy+pF9/kqw2s/2vyiKoiiKoiiKoiiKongi/wBcr1Cll6hqUgAAAABJRU5ErkJggg==", import.meta.url).href;
}), E = await U;
function G() {
  return u[Math.floor(Math.random() * u.length)];
}
function O(n) {
  const t = [];
  for (let o = 0; o < n; o++)
    t.push(G());
  return t.join("");
}
function H(n, t, o, r) {
  const a = C.get(r);
  n.drawImage(E, a * l, 0, l, l, t, o, l, l);
}
function B(n, t, o, r) {
  r.split("").forEach((a, c) => {
    H(n, t, o + c * l, a);
  });
}
function P(n, t, o, r, a) {
  const c = { x: l, y: l * r.length }, f = document.createElement("canvas"), d = f.getContext("2d");
  f.width = c.x, f.height = c.y, d.fillStyle = a, B(d, 0, 0, r), d.globalCompositeOperation = "source-in", d.fillRect(0, 0, c.x, c.y), n.drawImage(f, t, o);
}
function I(n, t, o, r, a, c) {
  P(n, t, o + 1, r, c), P(n, t, o, r, a);
}
function K(n, t, o, r, a) {
  n.save(), n.fillStyle = a, n.fillRect(t, o, l, l * r.length), n.restore();
}
const L = Object.prototype.toString;
function X(n) {
  return L.call(n) == "[object String]";
}
function D(n) {
  if (!X(n))
    return n;
  const t = document.createElement("canvas").getContext("2d");
  t.fillStyle = n, t.fillRect(0, 0, 1, 1);
  const [o, r, a, c] = t.getImageData(0, 0, 1, 1).data;
  return { r: o, g: r, b: a, a: c };
}
function Y(n, t) {
  const o = t.x || 0, r = t.y || 0, a = t.w, c = t.h, f = t.color_main || "lime", d = t.color_secondary || "green", b = t.color_bg || "black", y = t.n_strs, p = t.str_len, A = t.n_passes, S = D(b), x = t.effect_func || ((s, i, z, e) => {
    if (e == A - 1)
      return s;
    const w = i % 2 == 0 ? 0.4 : 0.2;
    return Math.random() > w ? s : S;
  }), M = Math.floor(a / l), N = Math.floor(c / l), g = document.createElement("canvas"), m = g.getContext("2d");
  g.width = a, g.height = c, m.fillStyle = b, m.fillRect(0, 0, a, c);
  const v = [];
  for (let s = 0; s < y; s++)
    v.push({
      x: Math.floor(Math.random() * M) * l,
      y: Math.floor(Math.random() * N) * l,
      text: O(p)
    });
  for (let s = 0; s < A; s++) {
    v.forEach((e) => {
      P(m, e.x, e.y + A - s + 1, e.text, d);
    });
    const i = m.getImageData(0, 0, a, c), z = new Uint8ClampedArray(i.data);
    for (let e = 0; e < a * c; e++) {
      const w = {
        r: i.data[e * 4 + 0],
        g: i.data[e * 4 + 1],
        b: i.data[e * 4 + 2],
        a: i.data[e * 4 + 3]
      }, R = e % a, Q = Math.floor(e / a), h = x(w, R, Q, s, e, z);
      i.data[e * 4 + 0] = h.r, i.data[e * 4 + 1] = h.g, i.data[e * 4 + 2] = h.b, i.data[e * 4 + 3] = h.a;
    }
    m.putImageData(i, 0, 0);
  }
  v.forEach((s) => {
    P(m, s.x, s.y, s.text, f);
  }), n.drawImage(g, o, r);
}
export {
  l as char_size,
  K as clearAreaToColor,
  Y as draw,
  H as drawChar,
  B as drawStr,
  P as drawStrWithColor,
  I as drawStrWithUnderStroke,
  O as randStr
};
