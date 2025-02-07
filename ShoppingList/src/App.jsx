import { useState } from "react";
import { data } from "./data";
import Header from "./Components/Header";
import Form from "./Components/Form";
import List from "./Components/List";
import Summary from "./Components/Summary";

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

export default App;
