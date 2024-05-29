import {
  Card,

} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { useState, useEffect, useRef  } from "react";
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

interface User{

  userId: number,
  userName: string,
  email:string,
  phoneNumber:string,
  skillsets:string,
  hobby:string,

}

async function getProducts(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>('https://localhost:7254/api/User');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

const Index = () => {
  const [products, setProducts] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const observer = useRef<IntersectionObserver | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (!loading && hasMore) {
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prevPage => prevPage + 1);
        }
      });

      if (observer.current) {
        observer.current.observe(document.querySelector('#bottom-sentinel'));
      }

      return () => {
        if (observer.current) {
          observer.current.disconnect();
        }
      };
    }
  }, [loading, hasMore]);

  useEffect(() => {
    const fetchMoreData = async () => {
      try {
        const response = await axios.get<User[]>(`https://localhost:7254/api/User?page=${page}`);
        if (response.data.length === 0) {
          setHasMore(false);
          return;
        }
        setProducts(prevProducts => [...prevProducts, ...response.data]);
      } catch (error) {
        console.error('Error fetching more products:', error);
      }
    };

    if (!loading && page > 1) {
      fetchMoreData();
    }
  }, [page, loading]);

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
          <>
            {products.map((user, index) => (
              <Card key={user.userId} className="w-full max-w-xs rounded-xl border width ">
                <div className="grid gap-4 p-4">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <img
                      alt="Product image"
                      className="aspect-[4/5] object-cover border w-full"
                      height="500"
                      src={`/img/logo.jpg}`}
                      width="400"
                    />
                  </div>
                  <div className="grid gap-1.5 h-48">
                    <h3 className="font-semibold text-sm md:text-base">{user.userName}</h3>
                    <p className="font-semibold text-sm md:text-base">${user.userName}</p>
                    <p className="text-sm md:text-base ">{user.userName}</p>
                  </div>
                  <Button size="sm" onClick={() => dispatch(increment(user.userName))}>Add to cart</Button>
                </div>
              </Card>
            ))}
            <div id="bottom-sentinel" style={{ height: '10px' }}></div>
          </>
        )}
      </div>
    </main>
  );
}

export default Index;