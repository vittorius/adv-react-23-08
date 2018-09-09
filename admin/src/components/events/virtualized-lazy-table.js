import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  loadingSelector,
  loadedSelector,
  toggleSelect,
  fetchLazy,
  eventListSelector
} from '../../ducks/events'
import { Table, Column, InfiniteLoader } from 'react-virtualized'
import DraggableEventRow from './draggable-event-row'
import 'react-virtualized/styles.css'

export class EventLazyTable extends Component {
  static propTypes = {}

  componentDidMount() {
    this.props.fetchLazy()
  }

  render() {
    const { loaded, events } = this.props
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={loaded ? events.length : events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) => (
          <Table
            ref={registerChild}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowRenderer={this.rowRenderer}
            rowHeight={40}
            headerHeight={50}
            overscanRowCount={1}
            width={700}
            height={300}
            onRowClick={this.handleSelect}
            onRowsRendered={onRowsRendered}
            rowClassName="test__event_table_row"
          >
            <Column dataKey="title" width={200} label="name" />
            <Column dataKey="where" width={300} label="place" />
            <Column dataKey="url" width={300} label="url" />
          </Table>
        )}
      </InfiniteLoader>
    )
  }

  isRowLoaded = ({ index }) => index < this.props.events.length

  loadMoreRows = () => {
    this.props.fetchLazy()
  }

  rowGetter = ({ index }) => this.props.events[index]

  rowRenderer = ({ key, ...props }) => (
    <DraggableEventRow key={key} {...props} />
  )

  handleSelect = ({ rowData }) => this.props.toggleSelect(rowData.id)
}

export default connect(
  (state) => ({
    events: eventListSelector(state),
    loading: loadingSelector(state),
    loaded: loadedSelector(state)
  }),
  { fetchLazy, toggleSelect }
)(EventLazyTable)
