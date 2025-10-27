import { motion } from 'motion/react';
import { CheckCircle } from 'lucide-react';

export function BookingSuccessAnimation() {
  return (
    <div className="flex items-center justify-center py-8">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20 
        }}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 0.6,
            repeat: Infinity,
            repeatDelay: 1
          }}
          className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckCircle className="h-16 w-16 text-green-600" />
        </motion.div>
      </motion.div>
    </div>
  );
}
