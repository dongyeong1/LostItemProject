
import GeoCode from "./GeoCode";
import { useEffect, useState } from "react";
import { Input,Button,Modal } from "antd";
import styled from 'styled-components'
import { SearchOutlined} from '@ant-design/icons';

const SearchWrapper=styled(Input)`

border-radius:200px;
height:50px;
width:500px;
font-size:25px;
`

function AddressInput({setCenter}) {

  const [text,setText]=useState('')
  const [errorText,setErrorText]=useState('')

  useEffect(()=>{
    setText('검색성공')

  },[text])

  useEffect(()=>{
    setErrorText('없는 지역입니다')

  },[errorText])




const success=()=>{
  Modal.success({
    content:text
  })
}

const error=()=>{
  Modal.error({
    content:errorText
  })
}
  

const handleButton = async() => {
    const currentAddr = document.getElementById("address").value;
    if (currentAddr) {
        console.log(currentAddr)
      //   return await console.log(GeoCode(currentAddr))
      const location = await GeoCode(currentAddr);
      console.log('asd',location)
      if(location.msg){
        setErrorText('다른지역으로 검색해주세요')
        
        return error()
      }else{
        setCenter({
          lat:location.lat,lng:location.lng
      })
        setText('검색성공')
        console.log(text)
        return success()
      }
      
     
     
      // console.log("ddd", lat, lng);
    }
  };
  return (
    <div>
      <SearchWrapper prefix={<SearchOutlined style={{fontSize:30}}/>}  size="large" enterButton="검색" onPressEnter={handleButton}
  placeholder='지역을 검색해보세요' id="address" />
      {/* <Button type="primary" onClick={handleButton}>클릭</Button> */}
    </div>
  );
}

export default AddressInput;
