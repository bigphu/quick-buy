export default function CartItem({ item, increaseQty, decreaseQty, removeItem }) {
  return (
    <div className="flex items-center justify-between bg-white shadow-sm rounded-2xl p-5 mb-5 border border-gray-100">
      <div className="flex gap-5">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 rounded-xl object-cover bg-gray-100"
        />

        <div>
          <h3 className="font-semibold text-lg">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.category}</p>
          <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>

          <button
            onClick={() => removeItem(item.id)}
            className="mt-2 text-blue-600 text-sm hover:underline"
          >
            Remove item
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => decreaseQty(item.id)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
        >
          -
        </button>

        <span className="font-medium">{item.quantity}</span>

        <button
          onClick={() => increaseQty(item.id)}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full"
        >
          +
        </button>
      </div>
    </div>
  );
}