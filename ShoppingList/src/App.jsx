import { useState } from "react";
import { data } from "./data";

function App() {
  const [items, setItems] = useState(data);

  function handleAddItem(item) {
    setItems((items) => [...items,  item]);
  }

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems(items => items.map(item => item.id == id ? {...item, completed: !item.completed} : item));
  }
  
  function handleClearList() {
    const onay = window.confirm("Listedeki tüm ürünleri silmek istediğinizden emin misiniz?");
    if(onay){
      setItems([]);
    }
  }
  return (
   <div className="app">
      <Header />
      <Form onAddItem={handleAddItem} onClearList={handleClearList}/>
      <List items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleUpdateItem}/>
      <Summary items={items} />
   </div>
  );
}

function Form({onAddItem, onClearList}) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(1);
  

  function handleFormSubmit(e) {
    e.preventDefault();
    if(title) { //submit olayını tetiklemez.
      const item = {id: Date.now(), title, quantity, completed: false}
      onAddItem(item);
      setTitle(''); //kaydedildikten sonra sıfırlanır.
      setQuantity(1);
    }
  }

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <input 
       value={title} 
       type="text" 
       placeholder="Ürün adı giriniz." 
       onChange={(e) => setTitle(e.target.value)}
      />  
      <select value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
        {Array.from({length:10}, (v,i) => i +1).map(num => <option value={num} key={num}>{num}</option>)}
      </select>
      <button type="submit">➕ Ekle</button>
      <button type="button" onClick={onClearList}>🗑️ Temizle</button>
    </form>
  );
}

function List({items, onDeleteItem, onUpdateItem}) {
  return <>
    {
      items.length > 0 ? (
       <div className="list">
          <ul>{items.map((i, index) => (<Item item={i} key={index} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} />))}</ul>
        </div>
      ) : <div className="list"> Sepette ürün yok</div>
    }
   </>;
}

function Item({item, onDeleteItem, onUpdateItem}) {
  return(
    <li>
      <input 
        type="checkbox" 
        checked={item.completed} 
        onChange={() => onUpdateItem(item.id)}
      />
      <span style={item.completed ? {textDecoration:"line-through"} : {} }>{item.quantity} {item.title}</span>
      <button onClick={() => onDeleteItem(item.id)}>X</button>
    </li>
  );
}

function Summary({items}) {
  if(items.length === 0) {
    return(
      <footer className="summary">Alışeriş Listenizi hazırlamaya başlayabilirsiniz.</footer>
    );
  }
  const itemsCount = items.length;
  const completedItemsCount = items.filter(item => item.completed). length;

  return(
    <footer className="summary">
      {
        itemsCount === completedItemsCount ? 
        <p>Alışverişi tamamladınız.</p> : 
        <p>Alışveriş sepetinizde {itemsCount} üründen {completedItemsCount} tanesi alındı. </p>
      }
      </footer>
  );
}

export default App;
