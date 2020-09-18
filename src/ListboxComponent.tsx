/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment */
import {
  ListSubheader,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import type { AutocompleteRenderGroupParams } from '@material-ui/lab'
import match from 'autosuggest-highlight/match'
import parse from 'autosuggest-highlight/parse'
import type { ReactNode } from 'react'
import React from 'react'
import type { ListChildComponentProps } from 'react-window'
import { VariableSizeList } from 'react-window'

const LISTBOX_PADDING = 8 // px
const LISTBOX_ROW_COUNT = 8 // rows
const ITEM_HEIGHT_STARTING_VALUE = 0
const FONT_WEIGHT_BOLD = 700
const FONT_WEIGHT_REGULAR = 400
const ITEM_HEIGHT_SM_UP = 36
const ITEM_HEIGHT_XS = 48
const FINAL_PADDING_MULTIPLYER = 2

function renderRow(props: ListChildComponentProps) {
  const { data, index, style } = props
  return React.cloneElement(data[index], {
    style: {
      ...style,
      top: (style.top as number) + LISTBOX_PADDING,
    },
  })
}

const OuterElementContext = React.createContext({})

// eslint-disable-next-line react/display-name
const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext)
  return <div ref={ref} {...props} {...outerProps} />
})

function useResetCache(data: unknown) {
  const ref = React.useRef<VariableSizeList>(null)
  React.useEffect(() => {
    if (ref.current !== null) {
      ref.current.resetAfterIndex(ITEM_HEIGHT_STARTING_VALUE, true)
    }
  }, [data])
  return ref
}

// Adapter for react-window
export const ListboxComponent = React.forwardRef<HTMLDivElement>(
  function ListboxComponent(props, ref) {
    // eslint-disable-next-line react/prop-types
    const { children, ...other } = props
    const itemData = React.Children.toArray(children)
    const theme = useTheme()
    const smUp = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: true })
    const itemCount = itemData.length
    const itemSize = smUp ? ITEM_HEIGHT_SM_UP : ITEM_HEIGHT_XS

    const getChildSize = (child: React.ReactNode) => {
      if (React.isValidElement(child) && child.type === ListSubheader) {
        return ITEM_HEIGHT_SM_UP
      }

      return itemSize
    }

    const getHeight = () => {
      if (itemCount > LISTBOX_ROW_COUNT) {
        return LISTBOX_ROW_COUNT * itemSize
      }
      // eslint-disable-next-line unicorn/no-fn-reference-in-iterator,unicorn/no-reduce
      return (
        itemData
          .map((item) => getChildSize(item))
          // eslint-disable-next-line unicorn/no-reduce
          .reduce((a, b) => a + b, ITEM_HEIGHT_STARTING_VALUE)
      )
    }

    const gridRef = useResetCache(itemCount)

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <VariableSizeList
            itemData={itemData}
            height={getHeight() + FINAL_PADDING_MULTIPLYER * LISTBOX_PADDING}
            width="100%"
            ref={gridRef}
            outerElementType={OuterElementType}
            innerElementType="ul"
            itemSize={(index) => getChildSize(itemData[index])}
            overscanCount={5}
            itemCount={itemCount}
          >
            {renderRow}
          </VariableSizeList>
        </OuterElementContext.Provider>
      </div>
    )
  },
)

export const RenderGroup = (
  params: AutocompleteRenderGroupParams,
): ReactNode[] => [
  <ListSubheader key={params.key} component="div">
    {params.group}
  </ListSubheader>,
  params.children,
]

export const RenderListOption = (
  name: string,
  inputValue: string,
): ReactNode => {
  const matches = match(name, inputValue)
  const parts = parse(name, matches)

  return (
    <Typography noWrap>
      {parts.map((part, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            fontWeight: part.highlight ? FONT_WEIGHT_BOLD : FONT_WEIGHT_REGULAR,
          }}
        >
          {part.text}
        </span>
      ))}
    </Typography>
  )
}
