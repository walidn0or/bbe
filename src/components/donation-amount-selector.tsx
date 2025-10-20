interface DonationAmountSelectorProps {
  selectedAmount: number | null;
  customAmount: string;
  onAmountSelect: (amount: number | null) => void;
  onCustomAmountChange: (amount: string) => void;
  donationType: 'one-time' | 'monthly';
}

export function DonationAmountSelector({
  selectedAmount,
  customAmount,
  onAmountSelect,
  onCustomAmountChange,
  donationType
}: DonationAmountSelectorProps) {
  const presetAmounts = donationType === 'monthly' 
    ? [10, 25, 50, 100] 
    : [25, 50, 100, 250, 500];

  const handleCustomAmountChange = (value: string) => {
    // Only allow numbers and decimal point
    const sanitized = value.replace(/[^0-9.]/g, '');
    onCustomAmountChange(sanitized);
    
    // Clear preset selection when typing custom amount
    if (sanitized) {
      onAmountSelect(null);
    }
  };

  const handlePresetSelect = (amount: number) => {
    onAmountSelect(amount);
    onCustomAmountChange('');
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">
        {donationType === 'monthly' ? 'Monthly Amount' : 'Donation Amount'}
      </h3>
      
      {/* Preset Amounts */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            onClick={() => handlePresetSelect(amount)}
            className={`p-3 rounded-lg border-2 transition-all ${
              selectedAmount === amount
                ? 'border-white bg-white/20 text-white'
                : 'border-white/30 text-white/70 hover:border-white/50'
            }`}
          >
            <div className="text-center">
              <div className="font-bold text-lg">${amount}</div>
              {donationType === 'monthly' && (
                <div className="text-sm opacity-90">per month</div>
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Custom Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium">
          Custom Amount
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70">
            $
          </span>
          <input
            type="text"
            value={customAmount}
            onChange={(e) => handleCustomAmountChange(e.target.value)}
            placeholder="Enter amount"
            className="w-full pl-8 pr-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/20 transition-all"
          />
        </div>
        {customAmount && parseFloat(customAmount) < 5 && (
          <p className="text-sm text-yellow-200">
            Minimum donation amount is $5
          </p>
        )}
      </div>

      {/* Amount Summary */}
      {(selectedAmount || (customAmount && parseFloat(customAmount) >= 5)) && (
        <div className="mt-4 p-3 bg-white/10 rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold">
              ${selectedAmount || parseFloat(customAmount)}
              {donationType === 'monthly' && (
                <span className="text-base font-normal"> /month</span>
              )}
            </div>
            {donationType === 'monthly' && (
              <div className="text-sm opacity-90 mt-1">
                ${((selectedAmount || parseFloat(customAmount)) * 12).toFixed(0)} per year
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
