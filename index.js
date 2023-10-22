class Node{
    constructor(value){
        this.value= value;
        this.left= null;
        this.right= null;
    }
};
class Tree{
    constructor(array){
        this.root = this.buildTree(array);
    };
    buildTree(array){
        if (array.length === 0) {
            console.log('no se puede crear sin datos')
            return null;
        };
        
        const root = new Node(array[0]);

        for (let i = 1; i < array.length; i++) {
            this.insert(root, array[i]);
        }

        return root;
    }

    insert(node, value) {
        if (value < node.value) {
            if (!node.left) {
                node.left = new Node(value);
            } else {
                this.insert(node.left, value);
            }
        } else if (value > node.value) {
            if (!node.right) {
                node.right = new Node(value);
            } else {
                this.insert(node.right, value);
            }
        }
    }
    insertValue(value){
        this.insert(this.root,value);
    }
    removeValue(node, value) {
        if (node === null) {
            return node;
        }
    
        if (value < node.value) {
            node.left = this.removeValue(node.left, value);
        } else if (value > node.value) {
            node.right = this.removeValue(node.right, value);
        } else {
    
            if (node.left === null) {
                return node.right;
            } else if (node.right === null) {
                return node.left;
            }
    
            node.value = this.minValue(node.right);
    
            node.right = this.removeValue(node.right, node.value);
        }
    
        return node;
    }
    minValue(node) {
        if (node === null) {
            return null;
        }
    
        let current = node;
        
        while (current.left !== null) {
            current = current.left;
        }
        return current.value;
    }
    find(node, value){
        if (node === null) {
            return node;
        };
        if (node.value === value) {
            console.log(node)
            return node; 
        } else if (node.value < value) {
            return this.find(node.right, value); 
        } else {
            return this.find(node.left, value); 
        }
    }
    levelOrder(callback) {
        if (!callback) {
            const result = [];
            const queue = [];
            if (this.root) {
                queue.push(this.root);
            }
            while (queue.length > 0) {
                const currentNode = queue.shift();
                result.push(currentNode.value);
                if (currentNode.left) {
                    queue.push(currentNode.left);
                }
                if (currentNode.right) {
                    queue.push(currentNode.right);
                }
            }
            return result;
        } else {
            const queue = [];
            if (this.root) {
                queue.push(this.root);
            }
            while (queue.length > 0) {
                const currentNode = queue.shift();
                callback(currentNode);
                if (currentNode.left) {
                    queue.push(currentNode.left);
                }
                if (currentNode.right) {
                    queue.push(currentNode.right);
                }
            }
        }
    }
    printInorder(node, arrayInorder) {
        if (node == null)
            return;
    
        let current = node;
        
        this.printInorder(current.left, arrayInorder);
    
        arrayInorder.push(current.value);
    
        this.printInorder(current.right, arrayInorder);
    }
    printPreorder(node, arrayPreorder) {
        if (node == null)
            return;
        let current= node
        arrayPreorder.push(current.value);
     
        this.printPreorder(current.left, arrayPreorder);
     
        this.printPreorder(current.right, arrayPreorder);
    }
    printPostorder(node, arrayPostorder){
        if (node == null)
        return;
        let current= node;
        
        this.printPostorder(current.left, arrayPostorder);
        
        
        this.printPostorder(current.right, arrayPostorder);
    
       
        arrayPostorder.push(current.value);
    }
    height() {
        console.log(this.calculateHeight(this.root))
        return this.calculateHeight(this.root);
    }

    calculateHeight(node) {
        if (node === null) {
            return 0;
        }
    
        const leftHeight = node.left ? this.calculateHeight(node.left) : 0;
        const rightHeight = node.right ? this.calculateHeight(node.right) : 0;
    
        return Math.max(leftHeight, rightHeight) + 1;
    }
    depth(value) {
        console.log(this.calculateDepth(this.root, value, 0))
        return this.calculateDepth(this.root, value, 0);
    }

    calculateDepth(node, value, depth) {
        if (node === null) {
            return -1; 
        }

        if (node.value === value) {
            return depth;
        }

        if (value < node.value) {
            return this.calculateDepth(node.left, value, depth + 1);
        } else {
            return this.calculateDepth(node.right, value, depth + 1);
        }
    }
    isBalanced() {
        return this.isBalancedHelper(this.root);
    }
    isBalancedHelper(node) {
        if (!node) {
            return true;
        }
        const leftHeight = this.calculateHeight(node.left);
        const rightHeight = this.calculateHeight(node.right);
        if (Math.abs(leftHeight - rightHeight) > 1) {
            return false;
        }
        return this.isBalancedHelper(node.left) && this.isBalancedHelper(node.right);
    }
    
    toBalance(){
        if( this.isBalanced()){

        }else {
            let inorder= [];
            this.printInorder(this.root, inorder);


        }
    }
}

function balanceToTree(arr) {
    const result = [];
  
    if (arr.length === 0) {
      return result;
    }
  
    const mid = Math.floor(arr.length / 2);
    result.push(arr[mid]);
  
    const leftHalf = arr.slice(0, mid);
    const rightHalf = arr.slice(mid + 1);
  
    const leftReorganized = balanceToTree(leftHalf);
    const rightReorganized = balanceToTree(rightHalf);
  
    for (let i = 0; i < leftReorganized.length || i < rightReorganized.length; i++) {
      if (i < leftReorganized.length) {
        result.push(leftReorganized[i]);
      }
      if (i < rightReorganized.length) {
        result.push(rightReorganized[i]);
      }
    }
  
    return result;
  }
    
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};
function callback(node, arr) {
    arr.push(node.value); // Realiza alguna acción en el nodo, como imprimir su valor
  }

let try1= []
for(let i= 0; i<25; i++){
    rng= Math.floor(Math.random() * (100)) + 1;
    try1.push(rng);
}
let try1Tree= new Tree(try1);

prettyPrint(try1Tree.root)

if (try1Tree.isBalanced()){
    console.log('Balanceado')
}else {
    console.log('Balanceadont')
};

let tr1Preorder= [];
try1Tree.printPreorder(try1Tree.root, tr1Preorder);
console.log(tr1Preorder);

let tr1Levelorder= [];
tr1Levelorder= try1Tree.levelOrder(callback(try1Tree.root, tr1Levelorder));
console.log(tr1Levelorder);

let tr1Postorder= [];
try1Tree.printPostorder(try1Tree.root, tr1Postorder);
console.log(tr1Postorder);

let tr1Inorder= [];
try1Tree.printInorder(try1Tree.root, tr1Inorder);
console.log(tr1Inorder);

console.log('Balanceando...');
let balanceado= balanceToTree(tr1Inorder);
try1Tree= new Tree(balanceado);

prettyPrint(try1Tree.root)

if (try1Tree.isBalanced()){
    console.log('Balanceado')
}else {
    console.log('Balanceadont')
};

try1Tree.printPreorder(try1Tree.root, tr1Preorder);
console.log(tr1Preorder);

tr1Levelorder= try1Tree.levelOrder(callback(try1Tree.root, tr1Levelorder));
console.log(tr1Levelorder);

try1Tree.printPostorder(try1Tree.root, tr1Postorder);
console.log(tr1Postorder);

try1Tree.printInorder(try1Tree.root, tr1Inorder);
console.log(tr1Inorder);