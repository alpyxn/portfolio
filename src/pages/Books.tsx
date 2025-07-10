import sucveceza from '../assets/library/sucveceza.jpg';
import solayagim from '../assets/library/solayagim.jpg';
import sokratesinsavunmasi from '../assets/library/sokratesinsavunmasi.jpg';
import kendimedusunceler from '../assets/library/kendimedusunceler.jpeg';
import duvarjeanpaul from '../assets/library/duvarjeanpaul.jpeg';
import boylesoyledizerdust from '../assets/library/boylesoyledizerdust.jpeg';
import book1984 from '../assets/library/1984.jpg';

// Enhanced floating particles background
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-30">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-gray-400 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

// Book interface
export interface Book {
  id: number;
  title: string;
  author: string;
  coverImage: string;
}

// Book Card Component
const BookCard: React.FC<{ book: Book }> = ({ book }) => {
  return (
    <div className="group relative animate-slide-up">
      <div className="text-center p-4 rounded-xl hover:bg-gray-50/50 transition-all duration-300">
        {/* Book Cover */}
        <div className="relative mb-3 mx-auto w-32 h-44 overflow-hidden rounded-lg shadow-md">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Book Info */}
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
            {book.title}
          </h3>
          <p className="text-xs text-gray-600 font-medium">
            {book.author}
          </p>
        </div>
      </div>
    </div>
  );
};

// Books data
const booksData: Book[] = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    coverImage: book1984
  },
  {
    id: 2,
    title: "Crime and Punishment",
    author: "Fyodor Dostoyevsky",
    coverImage: sucveceza
  },
  {
    id: 3,
    title: "Thus Spoke Zarathustra",
    author: "Friedrich Nietzsche",
    coverImage: boylesoyledizerdust
  },
  {
    id: 4,
    title: "The Wall",
    author: "Jean-Paul Sartre",
    coverImage: duvarjeanpaul
  },
  {
    id: 5,
    title: "Meditations",
    author: "Marcus Aurelius",
    coverImage: kendimedusunceler
  },
  {
    id: 6,
    title: "Apology of Socrates",
    author: "Plato",
    coverImage: sokratesinsavunmasi
  },
  {
    id: 7,
    title: "My Left Foot",
    author: "Christy Brown",
    coverImage: solayagim
  }
];

export default function Books() {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-blue-50 min-h-screen relative overflow-hidden">
      <FloatingParticles />
      <div className="section-padding pt-16 relative z-10">
        <div className="container-max-width">
          {/* Enhanced header section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100/50 to-transparent rounded-3xl blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="heading-secondary mb-8 text-gray-900 animate-fade-in">
                <span className="bg-gradient-to-r from-gray-800 to-gray-900 bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100 transition-all duration-500">
                  The Books That Stayed
                </span>
              </h1>
              
              {/* Quote section */}
              <div className="max-w-4xl mx-auto mb-8">
                <div className="card-professional rounded-2xl p-8 relative border-2 border-gray-100">
                  <div className="relative z-10">
                    {/* Quote icon */}
                    <div className="w-12 h-12 mx-auto mb-6 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                      </svg>
                    </div>
                    
                    {/* Quote text */}
                    <blockquote className="text-xl md:text-2xl text-gray-800 font-medium mb-4 leading-relaxed">
                      "Man is nothing else but what he makes of himself."
                    </blockquote>
                    
                    {/* Author */}
                    <cite className="text-gray-600 text-lg font-medium">
                      — Jean-Paul Sartre
                    </cite>
                    
                    {/* Description */}
                    <p className="text-gray-600 mt-6 text-lg leading-relaxed">
                      Here are the books that shaped some of that becoming.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Books grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {booksData.map((book, index) => (
              <div 
                key={book.id}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
              >
                <BookCard book={book} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 