import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { products } from '../data/products';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import { Navbar } from '../components/layout/Navbar';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === parseInt(productId));
  const { addToCart } = useAuth();
  const toast = useToast();

  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.show('Please select a size', { type: 'error' });
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      qty: quantity,
      variant: selectedSize,
    };

    addToCart(cartItem);
    toast.show('Added to cart successfully!', { type: 'success' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-xl shadow-sm overflow-hidden">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? 'border-yellow-500' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-yellow-600">${product.price.toFixed(2)}</p>
            </div>

            <div>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Size</h3>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-lg font-medium transition-colors ${
                      selectedSize === size
                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(99, quantity + 1))}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button
              onClick={handleAddToCart}
              className="w-full py-4 text-lg"
              size="lg"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>

            {/* Stock Info */}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className={`inline-block w-2 h-2 rounded-full ${
                product.stockLevel > 5 ? 'bg-green-500' : product.stockLevel > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></span>
              <span>
                {product.stockLevel > 5
                  ? 'In Stock'
                  : product.stockLevel > 0
                  ? `Only ${product.stockLevel} left`
                  : 'Out of Stock'
                }
              </span>
            </div>
          </div>
        </div>

        {/* Specifications */}
        <div className="mt-16 bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Material</h3>
              <p className="text-gray-600">{product.specifications.material}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Size Range</h3>
              <p className="text-gray-600">{product.specifications.size}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Care Instructions</h3>
              <p className="text-gray-600">{product.specifications.careInstructions}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
