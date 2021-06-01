class AVLTreeNode<T> {
	left: AVLTreeNode<T>;
	right: AVLTreeNode<T>;
	value: T;
	balanceFactor: number;
}

export default class AVLTree<T> {
	root: AVLTreeNode<T>;

	addNode(nodeValue: T) {
	}

	removeNode(isTarget: (nodeValue: T) => boolean): T {
		return null;
	}

	getBiggerNodeValues(amount: number): T[] {
		return [];
	}

	rotateSimpleRight() {
	}

	rotateSimpleLeft() {
	}

	rotateDoubleRight() {
	}

	rotateDoubleLeft() {
	}
}
