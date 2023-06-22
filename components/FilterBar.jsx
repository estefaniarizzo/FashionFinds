'use client'
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getFilterProducts } from "@/redux/Slice"

export default function FilterBar({ products, gender, category }) {

    const [rangeValue, setRangeValue] = useState(0)
    const [genders, setGenders] = useState("")
    const [categorys, setCategorys] = useState("")
    const [filterBrands, setFilterBrands] = useState([])
    const [filterColors, setFilterColors] = useState([])
    

    const [filterBar, setFilterBar] = useState({
        brand:"",
        color:""
    })
    const dispatch = useDispatch()

    console.log({FILTRADOPRINCIPAL:genders+" "+categorys})

    useEffect(()=>{setGenders(gender)},[gender])
    useEffect(()=>{setCategorys(category)},[category])

    useEffect(()=>{dispatch(getFilterProducts(gender,category))},[genders,categorys])
    
    const handleRange = (event) =>{
        setRangeValue(event.target.value)
    }
    
    const getBrands = () => {
        const arrayBrands = products?.flatMap((el) => el.brand[0])
        const brands = new Set(arrayBrands)
        const newArray = Array.from(brands)
        setFilterBrands(newArray)
    }


    const getColors = () => {
        const arrayColors = products?.flatMap((el) => el.color[0])
        const colors = new Set(arrayColors)
        const newArray = Array.from(colors)
        setFilterColors(newArray)
    }

    const handleBrandChange = (event) =>{
        const {value, checked} = event.target
        console.log(value);
        console.log(checked);
        if(checked){
            if(filterBar.brand==""){
                let valor = filterBar.brand+value+","
                setFilterBar({...filterBar,brand:valor})
            }
            else{
                let valor = filterBar.brand+value+","
                setFilterBar({...filterBar,brand:valor})
            }
        }else{
            let newBrands = filterBar.brand.replace(new RegExp(value + ",?"), "");
            setFilterBar({...filterBar, brand:newBrands})
        }
    }

    const handleColorChange = (event) =>{
        const {value, checked} = event.target;
        console.log(value);
        console.log(checked);
        if(checked){
            if(filterBar.color==""){
                let valor = filterBar.color+value+","
                setFilterBar({...filterBar,color:valor})
            }
            else{
                let valor = filterBar.color+value+","
                setFilterBar({...filterBar,color:valor})
            }
        }else{
            let newColors = filterBar.color.replace(new RegExp(value + ",?"), "");
            setFilterBar({...filterBar, color:newColors})
        }
    }
    
    useEffect(() => {
        getBrands()
        getColors()
    }, [products,filterBar])

    useEffect(() => {
        if((filterBrands!==','&&filterBrands.length>0)||(filterColors!==','&& filterColors.length>0)) handleSubmit()
    }, [filterBar])

    console.log(products);
    console.log(filterBrands);

    console.log(filterBar);

    const handleSubmit = () =>{
        if ((filterBar.brand && filterBar.brand.length>1)||(filterBar.color && filterBar.color.length>1)){
            let brand = filterBar.brand
            let color = filterBar.color
            dispatch(getFilterProducts(genders, categorys, brand!=","?brand:null, color!=","?color:null))
        }
        else{
            dispatch(getFilterProducts(genders, categorys))
        }
    }


    return (
        <div className="w-[20%]">


            <article className="w-[100%]  p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Brand</h3>
                <input
                    className="w-[100%] text-[0.8rem] p-[0.4rem] border-[#A9A9B2] border-[1px]"
                    type="text" placeholder="Search for brand" />

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    {
                        filterBrands?.map((brand, index) => {
                            return (
                            <label key={index} htmlFor="">
                                <input 
                                value={brand}
                                onChange={handleBrandChange}
                                type="checkbox" /> <span className="text-[#A9A9B2]">{brand}</span>
                            </label>
                            )
                        })
                    }
                </div>
                <h4 className="bg-[white] text-[#A9A9B2] text-[0.8rem] p-[0.4rem] text-center cursor-pointer border-[#A9A9B2] border-[1px]" onClick={handleSubmit}>Apply</h4>

            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Size</h3>
                <input
                    className="w-[100%] text-[0.8rem] p-[0.4rem] border-[#A9A9B2] border-[1px]"
                    type="text" placeholder="Search for size" />

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">37</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">38</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">39</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">40</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">41</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">42</span>
                    </label>
                    <label htmlFor="">
                        <input type="checkbox" /> <span className="text-[#A9A9B2]">43</span>
                    </label>
                </div>
                <h4 className="bg-[white] text-[#A9A9B2] text-[0.8rem] p-[0.4rem] text-center cursor-pointer border-[#A9A9B2] border-[1px]">Apply</h4>
            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Color</h3>
                <input
                    className="w-[100%] text-[0.8rem] p-[0.4rem] border-[#A9A9B2] border-[1px]"
                    type="text" placeholder="Search for color" />

                <div
                    className="flex flex-col h-[120px] overflow-y-scroll">
                        {
                        filterColors?.map((filter, index) => {
                            return (
                            <label key={index} htmlFor="">
                                <input type="checkbox" value={filter} onChange={handleColorChange}/> <span className="text-[#A9A9B2]">{filter}</span>
                            </label>
                            )
                        })
                    }
                </div>
                <h4 className="bg-[white] text-[#A9A9B2] text-[0.8rem] p-[0.4rem] text-center cursor-pointer border-[#A9A9B2] border-[1px]" onClick={handleSubmit}>Apply</h4>
            </article>

            <article className="w-[100%] p-[0.6rem] flex flex-col gap-y-[1rem]">
                <h3 className="border-[#A9A9B2] border-b-[1px]">Price</h3>
                <input value={rangeValue} onChange={handleRange} type="range" min={0} max={10000} />
                <span>{rangeValue}</span>
                <h4 className="bg-[white] text-[#A9A9B2] text-[0.8rem] p-[0.4rem] text-center cursor-pointer border-[#A9A9B2] border-[1px]">Apply</h4>
            </article>

        </div>
    )
}