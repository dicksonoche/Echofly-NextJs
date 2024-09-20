import {useInView} from 'react-intersection-observer'

interface InfiniteScrollerProps extends React.PropsWithChildren {
    onBottomReached: () => void;
    className?: string
}


const InfiniteScroller = ({
    children,
    onBottomReached,
    className
}: InfiniteScrollerProps) => {
    const {ref} = useInView({
        rootMargin: "200px", //For posts to load earlier before getting to the bottom page
        onChange(inView) {
            if (inView) {
                onBottomReached()
            }//If inview is true, call onBottomReched to load next page
        }
    })

  return (
    <div className={className}>
        {children}
        <div ref={ref} />
    </div>
  )
}

export default InfiniteScroller