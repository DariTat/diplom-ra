import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Preloader } from './Preloader';
import { categoriesChange, categoriesListRequest } from '../redux/slice/categoriesSlice';
import { getMore } from '../redux/slice/catalogListSlice';
import { Cart } from './Cart';
import { Error } from './Error';

export const Catalog = () => {
    let { itemCategories, loadingCategories, errorCategories, categorieActive} = useSelector(state => state.categoriesList);
    let { itemCatalog, loadingCatalog, errorCatalog, itemLength, offset } = useSelector(state => state.catalogList);
    const dispatch = useDispatch(); 
    
    useEffect(() => {
        dispatch(categoriesListRequest());
    }, [dispatch]);

    const handleChange = (id, e) => {
        e.preventDefault();
        offset = 0;
        dispatch(categoriesChange(id));
    }
    
    const handleGetMoreItems = () => {
        offset += 6;
        dispatch(getMore({payload: categorieActive, offset}));
    }

    return (
        <>
            {loadingCategories ? <Preloader/> : <ul className="catalog-categories nav justify-content-center">
                {itemCategories.map(categorie => {
                    return(
                        <li className="nav-item" key={categorie.id}>
                            <a className={categorie.id === categorieActive ? 'nav-link active': 'nav-link'} href="#" onClick={(e) => handleChange(categorie.id, e)}>{categorie.title}</a>
                        </li>
                    )
                })}
            </ul>}
            {errorCategories || errorCatalog && <Error/>}
            {loadingCatalog ? <Preloader/> : <div className='row'>
                {itemCatalog.map(item => (
                    <Cart item={item} key={item.id}/>
                ))}
            </div>}
            {itemLength > 5 && <div className="text-center">
                <button className="btn btn-outline-primary" onClick={handleGetMoreItems} disabled={loadingCatalog}>Загрузить ещё</button>
             </div>}
        </>
    )
}