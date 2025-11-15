export default function ColorsTest() {
  return (
    <div className="min-h-screen p-8 bg-background">
      <h1 className="text-4xl font-bold mb-8 text-foreground">
        Color Palette Test
      </h1>

      {/* Primary Colors */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Primary Colors</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="w-20 h-20 bg-primary-50 rounded flex items-center justify-center text-xs">
            50
          </div>
          <div className="w-20 h-20 bg-primary-100 rounded flex items-center justify-center text-xs">
            100
          </div>
          <div className="w-20 h-20 bg-primary-200 rounded flex items-center justify-center text-xs">
            200
          </div>
          <div className="w-20 h-20 bg-primary-300 rounded flex items-center justify-center text-xs">
            300
          </div>
          <div className="w-20 h-20 bg-primary-400 rounded flex items-center justify-center text-xs text-white">
            400
          </div>
          <div className="w-20 h-20 bg-primary-500 rounded flex items-center justify-center text-xs text-white">
            500
          </div>
          <div className="w-20 h-20 bg-primary-600 rounded flex items-center justify-center text-xs text-white">
            600
          </div>
          <div className="w-20 h-20 bg-primary-700 rounded flex items-center justify-center text-xs text-white">
            700
          </div>
          <div className="w-20 h-20 bg-primary-800 rounded flex items-center justify-center text-xs text-white">
            800
          </div>
          <div className="w-20 h-20 bg-primary-900 rounded flex items-center justify-center text-xs text-white">
            900
          </div>
          <div className="w-20 h-20 bg-primary-950 rounded flex items-center justify-center text-xs text-white">
            950
          </div>
        </div>
      </section>

      {/* Secondary Colors */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Secondary Colors</h2>
        <div className="flex gap-2 flex-wrap">
          <div className="w-20 h-20 bg-secondary-50 rounded flex items-center justify-center text-xs">
            50
          </div>
          <div className="w-20 h-20 bg-secondary-100 rounded flex items-center justify-center text-xs">
            100
          </div>
          <div className="w-20 h-20 bg-secondary-200 rounded flex items-center justify-center text-xs">
            200
          </div>
          <div className="w-20 h-20 bg-secondary-300 rounded flex items-center justify-center text-xs">
            300
          </div>
          <div className="w-20 h-20 bg-secondary-400 rounded flex items-center justify-center text-xs text-white">
            400
          </div>
          <div className="w-20 h-20 bg-secondary-500 rounded flex items-center justify-center text-xs text-white">
            500
          </div>
          <div className="w-20 h-20 bg-secondary-600 rounded flex items-center justify-center text-xs text-white">
            600
          </div>
          <div className="w-20 h-20 bg-secondary-700 rounded flex items-center justify-center text-xs text-white">
            700
          </div>
          <div className="w-20 h-20 bg-secondary-800 rounded flex items-center justify-center text-xs text-white">
            800
          </div>
          <div className="w-20 h-20 bg-secondary-900 rounded flex items-center justify-center text-xs text-white">
            900
          </div>
          <div className="w-20 h-20 bg-secondary-950 rounded flex items-center justify-center text-xs text-white">
            950
          </div>
        </div>
      </section>

      {/* Semantic Colors */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Semantic Colors</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-success-500 text-white rounded">Success</div>
          <div className="p-4 bg-warning-500 text-white rounded">Warning</div>
          <div className="p-4 bg-error-500 text-white rounded">Error</div>
        </div>
      </section>

      {/* Text Colors */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Text Colors</h2>
        <p className="text-primary-500 mb-2">Primary text color</p>
        <p className="text-secondary-500 mb-2">Secondary text color</p>
        <p className="text-success-600 mb-2">Success text color</p>
        <p className="text-warning-600 mb-2">Warning text color</p>
        <p className="text-error-600 mb-2">Error text color</p>
        <p className="text-muted-foreground mb-2">Muted text color</p>
      </section>

      {/* Border Colors */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Border Colors</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 border-2 border-primary-500 rounded">
            Primary Border
          </div>
          <div className="p-4 border-2 border-secondary-500 rounded">
            Secondary Border
          </div>
          <div className="p-4 border-2 border-border rounded">
            Default Border
          </div>
        </div>
      </section>
    </div>
  );
}
