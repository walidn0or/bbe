interface DonationTypeSelectorProps {
  selectedType: 'one-time' | 'monthly';
  onTypeChange: (type: 'one-time' | 'monthly') => void;
}

export function DonationTypeSelector({ selectedType, onTypeChange }: DonationTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Donation Type</h3>
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onTypeChange('one-time')}
          className={`p-3 rounded-lg border-2 transition-all ${
            selectedType === 'one-time'
              ? 'border-white bg-white/20 text-white'
              : 'border-white/30 text-white/70 hover:border-white/50'
          }`}
        >
          <div className="text-center">
            <div className="font-semibold">One-time</div>
            <div className="text-sm opacity-90">Single donation</div>
          </div>
        </button>
        
        <button
          onClick={() => onTypeChange('monthly')}
          className={`p-3 rounded-lg border-2 transition-all ${
            selectedType === 'monthly'
              ? 'border-white bg-white/20 text-white'
              : 'border-white/30 text-white/70 hover:border-white/50'
          }`}
        >
          <div className="text-center">
            <div className="font-semibold">Monthly</div>
            <div className="text-sm opacity-90">Recurring gift</div>
          </div>
        </button>
      </div>
      
      {selectedType === 'monthly' && (
        <div className="mt-3 p-3 bg-white/10 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">Monthly donations provide sustainable support and can be cancelled anytime</span>
          </div>
        </div>
      )}
    </div>
  );
}
