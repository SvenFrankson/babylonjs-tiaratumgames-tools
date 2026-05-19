import { Vector3, Mesh, Ray, TransformNode, Matrix } from "@babylonjs/core";
import { type IIntersection, SpherePlaneIntersection, SphereBoxIntersection, SphereCapsuleIntersection, SphereMeshIntersection, Intersection, RayPlaneIntersection, RayMeshIntersection, type IPlane, type ISphere, type IBox, type ICylinder, type ICapsule } from "./Intersection";

export function SphereCollidersIntersection(cSphere: Vector3, rSphere: number, colliders: (Collider | Mesh)[]): IIntersection[] {
    let intersections: IIntersection[] = [];

    for (let i = 0; i < colliders.length; i++) {
        let intersection = SphereColliderIntersection(cSphere, rSphere, colliders[i]);
        if (intersection && intersection.hit) {
            intersections.push(intersection);
        }
    }

    return intersections;
}

export function SphereColliderIntersection(cSphere: Vector3, rSphere: number, collider: Collider | Mesh): IIntersection | undefined {
    if (collider instanceof PlaneCollider) {
        return SpherePlaneIntersection(cSphere, rSphere, collider);
    } else if (collider instanceof SphereCollider) {
        // todo
    } else if (collider instanceof BoxCollider) {
        return SphereBoxIntersection(cSphere, rSphere, collider);
    } else if (collider instanceof CylinderCollider) {
        // todo
    } else if (collider instanceof CapsuleCollider) {
        return SphereCapsuleIntersection(cSphere, rSphere, collider.c1, collider.c2, collider.radius, collider.worldMatrix);
    } else if (collider instanceof MeshCollider) {
        return SphereMeshIntersection(cSphere, rSphere, collider.mesh);
    } else if (collider instanceof Mesh) {
        return SphereMeshIntersection(cSphere, rSphere, collider);
    }
}

export function RayCollidersIntersection(ray: Ray, colliders: (Collider | Mesh)[]): IIntersection {
    let intersection: IIntersection = new Intersection();

    for (let i = 0; i < colliders.length; i++) {
        let currIntersection = RayColliderIntersection(ray, colliders[i]);
        if (currIntersection && currIntersection.hit) {
            if (!intersection.hit || currIntersection.depth > intersection.depth) {
                intersection = currIntersection;
            }
        }
    }

    return intersection;
}

export function RayColliderIntersection(ray: Ray, collider: Collider | Mesh): IIntersection | undefined {
    if (collider instanceof PlaneCollider) {
        return RayPlaneIntersection(ray, collider);
    } else if (collider instanceof SphereCollider) {
        // todo
    } else if (collider instanceof MeshCollider) {
        return RayMeshIntersection(ray, collider.mesh);
    } else if (collider instanceof Mesh) {
        return RayMeshIntersection(ray, collider);
    }
}

export class Collider {}

export class PlaneCollider extends Collider implements IPlane {
    public static CreateFromBJSPlane(plane: Mesh): PlaneCollider {
        plane.computeWorldMatrix(true);
        return new PlaneCollider(plane.position, plane.forward.scale(-1));
    }

    public static CreateFromPoints(p1: Vector3, p2: Vector3, p3: Vector3): PlaneCollider {
        let l1 = p2.subtract(p1);
        let l2 = p3.subtract(p1);
        return new PlaneCollider(p1, Vector3.Cross(l1, l2));
    }

    constructor(
        public point: Vector3,
        public normal: Vector3,
    ) {
        super();
        if (this.normal.lengthSquared() != 1) {
            this.normal = this.normal.clone().normalize();
        }
    }
}

export class SphereCollider extends Collider implements ISphere {
    public center: Vector3 = Vector3.Zero();

    constructor(
        public localCenter: Vector3,
        public radius: number,
        public parent?: TransformNode,
    ) {
        super();
        this.recomputeWorldCenter();
    }

    public recomputeWorldCenter(): void {
        if (this.parent) {
            Vector3.TransformCoordinatesToRef(this.localCenter, this.parent.getWorldMatrix(), this.center);
        } else {
            this.center.copyFrom(this.localCenter);
        }
    }
}

export class BoxCollider extends Collider implements IBox {
    public width: number = 1;
    public height: number = 1;
    public depth: number = 1;

    constructor(public worldMatrix: Matrix) {
        super();
    }
}

export class CylinderCollider extends Collider implements ICylinder {
    public radius: number = 1;
    public height: number = 1;

    constructor(public worldMatrix: Matrix) {
        super();
    }
}

export class CapsuleCollider extends Collider implements ICapsule {
    constructor(
        public c1: Vector3,
        public c2: Vector3,
        public radius: number,
        public worldMatrix?: Matrix,
    ) {
        super();
    }
}

export class MeshCollider extends Collider {
    constructor(public mesh: Mesh) {
        super();
    }
}
