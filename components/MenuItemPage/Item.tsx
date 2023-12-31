import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import useStore from '../../hooks/useStore'

const Item = ({ item, ingredients }) => {
  const { order, setOrder } = useStore(state => ({ order: state.order, setOrder: state.setOrder }))

  const [showMenu, setShowMenu] = useState(false)
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const add_to_item = (ingredient) => {
    if(selectedIngredients.filter(ingred => ingred == ingredient).length > 0) {
      setSelectedIngredients(selectedIngredients.filter(ingred => ingred != ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const add_to_order = () => {
    let order_temp = {
      ...item,
      ingredients: selectedIngredients,
    }

    setOrder([...order, order_temp])
    setSelectedIngredients([])
    setShowMenu(false)
  }

  return (
    <View style={styles.view}>
      <TouchableOpacity
        onPress={() => setShowMenu(!showMenu)}
        style={styles.item_btn}>
        <Text style={styles.item_btn_text}>{item.name}</Text>
        <Text style={styles.item_btn_text}>{item.price}€</Text>
      </TouchableOpacity>

      {showMenu ?
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            style={styles.menu}>
            {ingredients?.map((ingredient, index) => (
              <TouchableOpacity
                style={[styles.menu_item_btn, { backgroundColor: selectedIngredients.filter(ingred => ingred == ingredient).length > 0 ? '#1ea0e6' : '#ffffff' }]}
                onPress={() => add_to_item(ingredient)}
                key={index}>
                <Text style={[styles.menu_item_btn_text, { color: selectedIngredients.filter(ingred => ingred == ingredient).length > 0 ? '#ffffff' : '#000000' }]}>{ingredient}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.complete_btn}
            onPress={() => add_to_order()}>
            <FontAwesomeIcon icon={faCheck} size={12} color={'#ffffff'} />
          </TouchableOpacity>
        </View>
        : null}
    </View>
  )
}

export default Item

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f7f8fa',
    margin: 5,
    padding: 12,
    borderRadius: 6,
  },
  item_btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item_btn_text: {
    fontFamily: 'Medium'
  },
  menu_item_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: 100,
    height: 50,
    marginTop: 10,
    marginRight: 10,
    borderRadius: 4
  },
  menu_item_btn_text: {
    fontFamily: 'Medium',
    fontSize: 12
  },
  complete_btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1ee650',
    width: 50,
    height: 25,
    marginTop: 10,
    marginLeft: 'auto',
    borderRadius: 4,
  }
})