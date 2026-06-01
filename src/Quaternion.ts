import { Quaternion, Vector3 } from "@babylonjs/core/Maths/math.vector";

var TmpVec3 = [Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero(), Vector3.Zero()];

export function QuaternionFromXYAxis(x: Vector3, y: Vector3): Quaternion {
    let q = Quaternion.Identity();
    QuaternionFromXYAxisToRef(x, y, q);
    return q;
}

export function QuaternionFromXYAxisToRef(x: Vector3, y: Vector3, ref: Quaternion): Quaternion {
    let xAxis = TmpVec3[0].copyFrom(x);
    let yAxis = TmpVec3[1].copyFrom(y);
    let zAxis = TmpVec3[2];

    Vector3.CrossToRef(xAxis, yAxis, zAxis);
    Vector3.CrossToRef(zAxis, xAxis, yAxis);
    Quaternion.RotationQuaternionFromAxisToRef(xAxis, yAxis, zAxis, ref);

    return ref;
}

export function QuaternionFromXZAxis(x: Vector3, z: Vector3): Quaternion {
    let q = Quaternion.Identity();
    QuaternionFromXZAxisToRef(x, z, q);
    return q;
}

export function QuaternionFromXZAxisToRef(x: Vector3, z: Vector3, ref: Quaternion): Quaternion {
    let xAxis = TmpVec3[0].copyFrom(x);
    let yAxis = TmpVec3[1];
    let zAxis = TmpVec3[2].copyFrom(z);

    Vector3.CrossToRef(zAxis, xAxis, yAxis);
    Vector3.CrossToRef(xAxis, yAxis, zAxis);
    Quaternion.RotationQuaternionFromAxisToRef(xAxis, yAxis, zAxis, ref);

    return ref;
}

export function QuaternionFromYZAxis(y: Vector3, z: Vector3): Quaternion {
    let q = Quaternion.Identity();
    QuaternionFromYZAxisToRef(y, z, q);
    return q;
}

export function QuaternionFromYZAxisToRef(y: Vector3, z: Vector3, ref: Quaternion): Quaternion {
    let xAxis = TmpVec3[0];
    let yAxis = TmpVec3[1].copyFrom(y);
    let zAxis = TmpVec3[2].copyFrom(z);

    Vector3.CrossToRef(yAxis, zAxis, xAxis);
    Vector3.CrossToRef(xAxis, yAxis, zAxis);
    Quaternion.RotationQuaternionFromAxisToRef(xAxis, yAxis, zAxis, ref);

    return ref;
}

export function QuaternionFromZXAxis(z: Vector3, x: Vector3): Quaternion {
    let q = Quaternion.Identity();
    QuaternionFromZXAxisToRef(z, x, q);
    return q;
}

export function QuaternionFromZXAxisToRef(z: Vector3, x: Vector3, ref: Quaternion): Quaternion {
    let xAxis = TmpVec3[0].copyFrom(x);
    let yAxis = TmpVec3[1];
    let zAxis = TmpVec3[2].copyFrom(z);

    Vector3.CrossToRef(zAxis, xAxis, yAxis);
    Vector3.CrossToRef(yAxis, zAxis, xAxis);
    Quaternion.RotationQuaternionFromAxisToRef(xAxis, yAxis, zAxis, ref);

    return ref;
}

export function QuaternionFromZYAxis(z: Vector3, y: Vector3): Quaternion {
    let q = Quaternion.Identity();
    QuaternionFromZYAxisToRef(z, y, q);
    return q;
}

export function QuaternionFromZYAxisToRef(z: Vector3, y: Vector3, ref: Quaternion): Quaternion {
    let xAxis = TmpVec3[0];
    let yAxis = TmpVec3[1].copyFrom(y);
    let zAxis = TmpVec3[2].copyFrom(z);

    Vector3.CrossToRef(yAxis, zAxis, xAxis);
    Vector3.CrossToRef(zAxis, xAxis, yAxis);
    Quaternion.RotationQuaternionFromAxisToRef(xAxis, yAxis, zAxis, ref);

    return ref;
}
