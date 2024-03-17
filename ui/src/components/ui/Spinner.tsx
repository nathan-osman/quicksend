import SpinnerSvg from '../../img/spinner.svg'

export default function Spinner() {
  return (
    <div className="flex gap-x-4 items-center justify-center">
      <img
        src={SpinnerSvg}
        className="w-12"
      />
      <div>
        <div className="text-2xl">Please wait</div>
        <div className="text-muted">Page is loading...</div>
      </div>
    </div>
  )
}
