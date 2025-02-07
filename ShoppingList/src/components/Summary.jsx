export default function Summary({items}) {
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