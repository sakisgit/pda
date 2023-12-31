import React from 'react'
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashCan } from '@fortawesome/free-regular-svg-icons'
import useStore from '../../hooks/useStore'

const OrderItem = ({ order }) => {
  const { stateOrder, setOrder } = useStore(state => ({ stateOrder: state.order, setOrder: state.setOrder }))

  const delete_from_order = () => {
    setOrder(stateOrder.filter(stateOrderItem => stateOrderItem != order))
  }

  return (
    <View style={styles.view}>
      <View style={styles.top_wrapper}>
        <Text style={styles.order_name_text}>{order.name}</Text>

        <TouchableOpacity
          onPress={() => delete_from_order()}>
          <FontAwesomeIcon icon={faTrashCan} size={12} color={'#e61e1e'} />
        </TouchableOpacity>
      </View>

      <View style={styles.order_ingred_wrapper}>
        {order.ingredients?.map((ingred, index) => (
          <Text style={styles.order_ingred} key={index}>{ingred}</Text>
        ))}
      </View>
    </View>
  )
}

export default OrderItem

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#f7f8fa',
    margin: 5,
    padding: 12,
    borderRadius: 6,
  },
  top_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  order_name_text: {
    fontFamily: 'Medium'
  },
  order_ingred_wrapper: {
    marginLeft: 8,
    marginTop: 2
  },
  order_ingred: {
    fontFamily: 'Regular',
    opacity: 0.5
  }
})