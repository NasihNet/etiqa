import {
  Card,

} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { useState, useEffect } from "react";
import SkeletonCard from "@/components/SkeletonCard";
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../store/slices/productSlice';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

interface Product {
  productId: string,
  name: string,
  description: string,
  unitPrice: number,
  maximumQuantity: number,
  imageName: string
}

async function getProducts(): Promise<Product[]> {
  try {
    const response = await axios.get<Product[]>('https://localhost:7206/api/Product');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; // Rethrow the error to be caught by the caller
  }
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //const counter = useSelector((state: any) => state.counter.value);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchData();
  }, []);

  return (
    <main>
      <h2 className="mb-8">User List</h2>
      <div className="grid grid-cols-3 gap-8">
      {loading ? (
        <>
        {"abcdefghi".split('').map(i => (
          <SkeletonCard key={i} />
        ))}
        </> 
        ) : (
          products.map(product => (
            <Card key={product.productId} className="w-full max-w-xs rounded-xl border width ">
            <div className="grid gap-4 p-4">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
          <img
            alt="Product image"
            className="aspect-[4/5] object-cover border w-full"
            height="500"
            src={`/img/${product.imageName}`}
            width="400"
          />
        </div>
        <div className="grid gap-1.5 h-48">
          <h3 className="font-semibold text-sm md:text-base">{product.name}</h3>
          <p className="font-semibold text-sm md:text-base">${product.unitPrice}</p>
          <p className="text-sm md:text-base ">{product.description}</p>
        </div> 
        <Button size="sm" onClick={() => dispatch(increment(product.name))}>Add to cart</Button>
      </div>
            </Card>
          ))
        )}
      </div>
    </main>
  );
}

export default Index;
